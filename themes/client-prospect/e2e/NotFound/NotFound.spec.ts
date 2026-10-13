import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const NOT_FOUND_HEADING = 'Page introuvable';
const IGNORED_IDS = ['region', 'svg-img-alt'];

test.describe('Not Found Page', () => {
  test('unknown routes show 404 page', async ({ page }) => {
    const invalidRoutes = ['/nonexistent-page', '/admin', '/api/users', '/special-page'];

    for (const route of invalidRoutes) {
      await page.goto(route);
      await expect(page.getByRole('heading', { name: NOT_FOUND_HEADING }).first()).toBeVisible();
      await expect(page.getByText('Erreur 404')).toBeVisible();
    }
  });

  test('404 page allows returning home', async ({ page }) => {
    page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/nonexistent-page');

    const returnLink = page.getByRole('link', {
      name: /Retour à la page d'accueil/i,
    });
    await expect(returnLink).toBeVisible();
    await returnLink.click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: /Logo AXA/i })).toBeVisible();
  });

  test('404 page: no critical axe violations', async ({ page }) => {
    await page.goto('/nonexistent-page');

    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter(
      (v) => (v.impact === 'critical' || v.impact === 'serious') && !IGNORED_IDS.includes(v.id),
    );

    expect(criticalViolations).toHaveLength(0);
  });
});
