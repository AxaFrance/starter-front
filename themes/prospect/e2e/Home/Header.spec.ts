import { test, expect } from '@playwright/test';

test('prospect Header displays the application title', async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Starter Axa' }).first()).toBeVisible();
});
