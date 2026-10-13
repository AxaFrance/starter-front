import { test, expect } from '@playwright/test';

test('client Header action remains available after returning home', async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/nonexistent-page');

  await page
    .getByRole('link', {
      name: /Retour à la page d'accueil/i,
    })
    .click();

  await expect(page).toHaveURL('/');
  await expect(page.getByRole('button', { name: 'Mon action' }).first()).toBeVisible();
});
