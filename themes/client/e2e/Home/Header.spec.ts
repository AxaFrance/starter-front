import { test, expect } from '@playwright/test';

test.describe('Client Header', () => {
  test('desktop header displays menu and action controls', async ({ page }) => {
    page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Mon action' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ouvrir le menu' }).first()).toBeVisible();
  });

  test('mobile header displays burger menu control', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: /ouvrir le menu/i }).first()).toBeVisible();
  });
});
