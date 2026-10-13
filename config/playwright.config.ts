import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const playwrightPort = Number(process.env['PLAYWRIGHT_PORT'] ?? 5174);
const baseURL = `http://127.0.0.1:${playwrightPort}`;

if (!Number.isInteger(playwrightPort) || playwrightPort < 1 || playwrightPort > 65535) {
  throw new Error('PLAYWRIGHT_PORT must be an integer between 1 and 65535.');
}

export default defineConfig({
  testDir: resolve(rootDir, 'e2e'),
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `npm run dev:mock -- --host 127.0.0.1 --port ${playwrightPort} --strictPort`,
    cwd: rootDir,
    url: baseURL,
    reuseExistingServer: false,
  },
});
