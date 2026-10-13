import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const IGNORED_IDS = ['region', 'svg-img-alt', 'heading-order'];

test.describe('Error Page', () => {
  test('error page renders', async ({ page }) => {
    await page.goto('/error');

    await expect(page.getByRole('heading', { name: 'Error Page distributeur' })).toBeVisible();
    await expect(page.getByText('An error has occurred.')).toBeVisible();
  });

  test('error page: no critical axe violations', async ({ page }) => {
    await page.goto('/error');

    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter(
      (v) => (v.impact === 'critical' || v.impact === 'serious') && !IGNORED_IDS.includes(v.id),
    );

    expect(criticalViolations).toHaveLength(0);
  });
});
