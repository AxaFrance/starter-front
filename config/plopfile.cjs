const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execSync } = require('node:child_process');

function copyDirRecursiveSync(src, dest) {
  try {
    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyDirRecursiveSync(srcPath, destPath);
      } else {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (err) {
          console.warn(`Warning: Could not copy ${srcPath} to ${destPath}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not process directory ${src}: ${err.message}`);
  }
}

function replaceTemplateTokens(value, replacements) {
  return Object.entries(replacements).reduce(
    (output, [token, replacement]) => output.split(token).join(replacement),
    value,
  );
}

function copyTemplateDirRecursiveSync(src, dest, replacements, shouldSkip) {
  try {
    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);

      if (shouldSkip(srcPath)) {
        continue;
      }

      const destName = replaceTemplateTokens(entry.name, replacements);
      const destPath = path.join(dest, destName);

      if (entry.isDirectory()) {
        copyTemplateDirRecursiveSync(srcPath, destPath, replacements, shouldSkip);
      } else {
        try {
          const content = fs.readFileSync(srcPath, 'utf8');
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, replaceTemplateTokens(content, replacements));
        } catch (err) {
          console.warn(
            `Warning: Could not template-copy ${srcPath} to ${destPath}: ${err.message}`,
          );
        }
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not process template directory ${src}: ${err.message}`);
  }
}

function fetchPluginSkillFromRepo(skillPlugin, pluginSkillTargetPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'canopee-plugin-'));
  const remoteRepo = 'https://github.com/AxaFrance/design-system.git';
  const sparsePath = `plugins/${skillPlugin}/skills/${skillPlugin}`;

  try {
    execSync(`git clone --depth 1 --filter=blob:none --sparse ${remoteRepo} "${tempDir}"`, {
      stdio: 'ignore',
    });
    execSync(`git -C "${tempDir}" sparse-checkout set "${sparsePath}"`, { stdio: 'ignore' });

    const pluginSkillSourcePath = path.join(tempDir, sparsePath);

    if (!fs.existsSync(pluginSkillSourcePath)) {
      throw new Error(`Theme plugin skill folder not found in remote repository: ${sparsePath}`);
    }

    fs.rmSync(pluginSkillTargetPath, { recursive: true, force: true });
    copyDirRecursiveSync(pluginSkillSourcePath, pluginSkillTargetPath);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

module.exports = function (plop) {
  plop.setGenerator('customize', {
    description: 'Copie le NotFound selon le theme AXA',
    prompts: [
      {
        type: 'list',
        name: 'theme',
        message: 'Quel thème du Design System Axa souhaitez-vous utiliser ?',
        choices: [
          { name: 'Client', value: 'client' },
          { name: 'Prospect', value: 'prospect' },
          { name: 'Distributeur', value: 'distributeur' },
        ],
      },
    ],
    actions(answers) {
      const repoRoot = path.resolve(plop.getPlopfilePath(), '..');
      const skillPlugin =
        answers.theme === 'distributeur' ? 'canopee-distributeur' : 'canopee-prospect-client';
      const commonTheme = ['client', 'prospect'].includes(answers.theme) ? 'client-prospect' : null;
      const sourcePaths = [
        ...(commonTheme ? [path.join(repoRoot, 'themes', commonTheme)] : []),
        path.join(repoRoot, 'themes', answers.theme),
      ];
      const prospectResources =
        answers.theme === 'prospect'
          ? [
              {
                source: path.join(repoRoot, 'themes', 'prospect', 'features'),
                target: path.join(repoRoot, 'features'),
              },
              {
                source: path.join(repoRoot, 'themes', 'prospect', '.github', 'prompts'),
                target: path.join(repoRoot, '.github', 'prompts'),
              },
            ]
          : [];
      const targetPath = path.join(repoRoot, 'src');
      const githubSkillsRoot = path.join(repoRoot, '.github', 'skills');
      const pluginSkillTargetPath = path.join(githubSkillsRoot, skillPlugin);

      const legacySkillPath =
        skillPlugin === 'canopee-distributeur'
          ? path.join(githubSkillsRoot, 'canopee-prospect-client')
          : path.join(githubSkillsRoot, 'canopee-distributeur');

      for (const sourcePath of sourcePaths) {
        if (!fs.existsSync(sourcePath)) {
          throw new Error(`Theme source folder not found: ${sourcePath}`);
        }
      }

      for (const { source } of prospectResources) {
        if (!fs.existsSync(source)) {
          throw new Error(`Prospect resource folder not found: ${source}`);
        }
      }

      if (!fs.existsSync(targetPath)) {
        throw new Error(`Target src folder not found: ${targetPath}`);
      }

      fs.mkdirSync(githubSkillsRoot, { recursive: true });
      fetchPluginSkillFromRepo(skillPlugin, pluginSkillTargetPath);

      // Safely remove legacy skill path if it exists
      try {
        if (fs.existsSync(legacySkillPath)) {
          fs.rmSync(legacySkillPath, { recursive: true, force: true });
        }
      } catch (err) {
        console.warn(`Warning: Could not remove legacy skill path: ${err.message}`);
      }

      // Copy e2e from theme to project root
      const e2eTargetPath = path.join(repoRoot, 'e2e');
      const e2eSourcePaths = sourcePaths;
      if (e2eSourcePaths.some((sourcePath) => fs.existsSync(path.join(sourcePath, 'e2e')))) {
        try {
          if (fs.existsSync(e2eTargetPath)) {
            fs.rmSync(e2eTargetPath, { recursive: true, force: true });
          }
          for (const sourcePath of e2eSourcePaths) {
            const e2eSourcePath = path.join(sourcePath, 'e2e');
            if (fs.existsSync(e2eSourcePath)) {
              copyDirRecursiveSync(e2eSourcePath, e2eTargetPath);
            }
          }
          console.log(`✅ Tests E2E copiés depuis le thème ${answers.theme}`);
        } catch (err) {
          console.warn(`Warning: Could not copy e2e tests: ${err.message}`);
        }
      }

      for (const { source, target } of prospectResources) {
        copyTemplateDirRecursiveSync(
          source,
          target,
          {
            '{{theme}}': answers.theme,
          },
          () => false,
        );
      }

      for (const sourcePath of sourcePaths) {
        const sourceE2ePath = path.join(sourcePath, 'e2e');
        copyTemplateDirRecursiveSync(
          sourcePath,
          targetPath,
          {
            '{{theme}}': answers.theme,
          },
          (currentPath) =>
            currentPath.startsWith(sourceE2ePath) ||
            prospectResources.some(
              ({ source: resourcePath }) =>
                currentPath === resourcePath ||
                currentPath.startsWith(`${resourcePath}${path.sep}`) ||
                resourcePath.startsWith(`${currentPath}${path.sep}`),
            ) ||
            path.basename(currentPath) === 'README.md',
        );
      }

      return ['✅ Fichiers du thème copiés dans src'];
    },
  });
};
