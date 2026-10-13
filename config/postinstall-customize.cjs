const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const VALID_THEMES = new Set(['client', 'prospect', 'distributeur']);

function isKeepThemesEnabled() {
  return ['true', '1'].includes(
    process.env.AXA_KEEP_THEMES || process.env.npm_config_keep_themes || '',
  );
}

function readThemeFromMarker(markerPath) {
  if (!fs.existsSync(markerPath)) {
    return null;
  }

  const content = fs.readFileSync(markerPath, 'utf8').trim();
  return VALID_THEMES.has(content) ? content : null;
}

function resolveTheme(markerPath) {
  return (
    readThemeFromMarker(markerPath) || process.env.npm_config_theme || process.env.AXA_THEME || null
  );
}

function findGeneratedTheme(repoRoot) {
  const sourceRoot = path.join(repoRoot, 'src');
  const pendingPaths = [sourceRoot];

  while (pendingPaths.length > 0) {
    const currentPath = pendingPaths.pop();

    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        pendingPaths.push(entryPath);
        continue;
      }

      const content = fs.readFileSync(entryPath, 'utf8');
      const match = content.match(/@axa-fr\/canopee-react\/(client|prospect|distributeur)/);

      if (match) {
        return match[1];
      }
    }
  }

  return null;
}

function removePostinstallScript(packagePath) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (!packageJson.scripts?.postinstall) {
    return;
  }

  delete packageJson.scripts.postinstall;
  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
}

function finalizeGeneratedProject(repoRoot) {
  const themesPath = path.join(repoRoot, 'themes');
  const packagePath = path.join(repoRoot, 'package.json');
  const plopfilePath = path.join(repoRoot, 'config', 'plopfile.cjs');
  const postinstallPath = path.join(repoRoot, 'config', 'postinstall-customize.cjs');

  fs.rmSync(themesPath, { recursive: true, force: true });
  removePostinstallScript(packagePath);
  fs.rmSync(plopfilePath, { force: true });
  fs.rmSync(postinstallPath, { force: true });
  console.log('Templates et scripts de scaffolding/postinstallation supprimes.');
}

function replaceProjectReadme(repoRoot, theme) {
  const readmeSource = path.join(repoRoot, 'themes', 'README.md');

  if (!fs.existsSync(readmeSource)) {
    throw new Error(`README template not found for theme "${theme}".`);
  }

  const readmeContent = fs.readFileSync(readmeSource, 'utf8').replaceAll('{{theme}}', theme);
  fs.writeFileSync(path.join(repoRoot, 'README.md'), readmeContent);
}

function run() {
  const repoRoot = path.resolve(__dirname, '..');
  const markerPath = path.join(repoRoot, '.initialized');

  if (!fs.existsSync(markerPath)) {
    console.log('No .initialized marker found, skipping theme customization.');
    return;
  }

  const theme = resolveTheme(markerPath);
  const plopBin = path.join(
    repoRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'plop.cmd' : 'plop',
  );

  const args = ['--plopfile', './config/plopfile.cjs', 'customize'];

  if (theme) {
    if (!VALID_THEMES.has(theme)) {
      throw new Error(
        `Unsupported theme "${theme}". Expected one of ${Array.from(VALID_THEMES).join(', ')}.`,
      );
    }

    args.push(theme);
  }

  execFileSync(plopBin, args, {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  fs.rmSync(markerPath, { force: true });
  console.log(
    theme ? `Theme customization applied for "${theme}".` : 'Theme customization applied.',
  );

  if (isKeepThemesEnabled()) {
    console.log(
      'Mode contributeur active: themes/ et les scripts de postinstallation sont conserves.',
    );
    return;
  }

  const generatedTheme = theme || findGeneratedTheme(repoRoot);

  if (!generatedTheme) {
    throw new Error('Unable to determine the generated theme for the project README.');
  }

  replaceProjectReadme(repoRoot, generatedTheme);
  finalizeGeneratedProject(repoRoot);
}

try {
  run();
} catch (error) {
  console.error('Theme customization failed:', error.message);
  process.exit(1);
}
