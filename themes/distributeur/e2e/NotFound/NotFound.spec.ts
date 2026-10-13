import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const NOT_FOUND_HEADING = 'Page Not Found distributeur';
const IGNORED_IDS = ['region', 'svg-img-alt', 'heading-order'];

test.describe('Not Found Page', () => {
  test('unknown routes show 404 page', async ({ page }) => {
    const invalidRoutes = ['/nonexistent-page', '/admin', '/api/users', '/%20special%20'];

    for (const route of invalidRoutes) {
      await page.goto(route);
      await expect(page.getByRole('heading', { name: NOT_FOUND_HEADING })).toBeVisible();
    }
  });

  test('rapid navigation ends on 404', async ({ page }) => {
    await page.goto('/page1');
    await expect(page.getByRole('heading', { name: NOT_FOUND_HEADING })).toBeVisible();
    await page.goto('/page2');
    await expect(page.getByRole('heading', { name: NOT_FOUND_HEADING })).toBeVisible();
    await page.goto('/page3');

    await expect(page.getByRole('heading', { name: NOT_FOUND_HEADING })).toBeVisible();
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
