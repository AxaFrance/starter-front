const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execSync } = require('node:child_process');

function copyDirRecursiveSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function fetchPluginSkillFromRepo(skillPlugin, pluginSkillTargetPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'canopee-plugin-'));
  const remoteRepo = 'https://github.com/AxaFrance/design-system.git';
  const sparsePath = `plugins/${skillPlugin}/skills/${skillPlugin}`;

  try {
    console.log(`Fetching ${skillPlugin} from remote repository...`);
    execSync(`git clone --depth 1 --filter=blob:none --sparse "${remoteRepo}" "${tempDir}"`, {
      stdio: 'ignore',
    });
    execSync(`git -C "${tempDir}" sparse-checkout set "${sparsePath}"`, { stdio: 'ignore' });

    const pluginSkillSourcePath = path.join(tempDir, sparsePath);

    if (!fs.existsSync(pluginSkillSourcePath)) {
      throw new Error(`Theme plugin skill folder not found in remote repository: ${sparsePath}`);
    }

    fs.rmSync(pluginSkillTargetPath, { recursive: true, force: true });
    copyDirRecursiveSync(pluginSkillSourcePath, pluginSkillTargetPath);
    console.log(`✓ Updated ${skillPlugin}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function updateSkills() {
  const repoRoot = path.resolve(__dirname, '..');
  const githubSkillsRoot = path.join(repoRoot, '.github', 'skills');

  if (!fs.existsSync(githubSkillsRoot)) {
    console.log('No local skills installed. Run "npm run scaffold customize <theme>" to install.');
    process.exit(0);
  }

  const installedDirs = fs.readdirSync(githubSkillsRoot, { withFileTypes: true });
  const installedPlugins = installedDirs.filter((d) => d.isDirectory()).map((d) => d.name);

  if (!installedPlugins.length) {
    console.log('No local skills installed. Run "npm run scaffold customize <theme>" to install.');
    process.exit(0);
  }

  console.log('Updating installed local skills...\n');

  for (const plugin of installedPlugins) {
    const pluginSkillTargetPath = path.join(githubSkillsRoot, plugin);
    fetchPluginSkillFromRepo(plugin, pluginSkillTargetPath);
  }

  console.log('\n✓ All skills updated successfully.');
}

try {
  updateSkills();
} catch (error) {
  console.error('Error updating skills:', error.message);
  process.exit(1);
}
