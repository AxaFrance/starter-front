import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const IGNORED_IDS = [
  'region',
  'svg-img-alt',
  'heading-order',
  'landmark-one-main',
  'page-has-heading-one',
];

const CRITICAL_RULES = [
  'color-contrast',
  'image-alt',
  'label',
  'button-name',
  'link-name',
  'empty-heading',
  'html-lang-valid',
];

const filterViolations = (violations: { id: string; description?: string }[]) =>
  violations.filter((v) => !IGNORED_IDS.includes(v.id));

test.describe('Home Page', () => {
  test('home page renders key elements', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('banner').getByText('Starter Axa')).toBeVisible();
    await expect(page.getByRole('link', { name: /Logo AXA/i })).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('logo link points to expected target', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /Logo AXA/i })).toHaveAttribute(
      'href',
      'https://www.axa.fr/',
    );
  });

  test('home page: no axe violations (WCAG 2.1 AA)', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page }).analyze();
    const filtered = filterViolations(results.violations);

    for (const rule of CRITICAL_RULES) {
      const ruleViolations = filtered.filter((v) => v.id === rule);
      expect(
        ruleViolations,
        `Regle "${rule}" violee : ${ruleViolations.map((v) => v.description).join(', ')}`,
      ).toHaveLength(0);
    }

    expect(filtered).toHaveLength(0);
  });

  test('keyboard focus is visible on interactive elements', async ({ page }) => {
    await page.goto('/');

    const logoLink = page.getByRole('link', { name: /Logo AXA/i });
    await logoLink.focus();
    await expect(logoLink).toBeFocused();

    const outline = await logoLink.evaluate((el) => window.getComputedStyle(el).outline);
    expect(outline).not.toBe('none');
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');

    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(
        (text && text.trim().length > 0) || Boolean(ariaLabel),
        `Button ${i} has no accessible name`,
      ).toBe(true);
    }
  });

  test('home page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(Date.now() - startTime).toBeLessThan(3000);
  });

  test('no console errors or unhandled rejections on home page', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');

    expect(errors).toHaveLength(0);
  });

  test('home layout renders header, main and logo with valid dimensions', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    const logoLink = page.getByRole('link', { name: /Logo AXA/i });
    await expect(logoLink).toBeVisible();
    const box = await logoLink.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  });

  test('document metadata: lang, viewport, title', async ({ page }) => {
    await page.goto('/');

    expect(await page.locator('html').getAttribute('lang')).toBeTruthy();
    expect(await page.locator('meta[name="viewport"]').getAttribute('content')).toContain(
      'width=device-width',
    );
    expect((await page.title()).length).toBeGreaterThan(0);
  });

  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'mobile-landscape', width: 667, height: 375 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`renders correctly on ${name}`, async ({ page }) => {
      page.setViewportSize({ width, height });
      await page.goto('/');

      await expect(page.getByRole('heading', { level: 1, name: 'Accueil' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Logo AXA/i })).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
    });
  });
});
