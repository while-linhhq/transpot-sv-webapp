import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows brand (Vietnamese default)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Taxi Tải Lê Đạt',
        includeHidden: true,
      }),
    ).toBeAttached();
  });

  test('navigation has gallery link (VI)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: /Hình ảnh thực tế/ }).first()).toBeVisible();
  });

  test('pricing section is visible (VI)', async ({ page }) => {
    await page.goto('/#bang-gia', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 2, name: /GIÁ MINH BẠCH/i })).toBeVisible();
    await expect(page.locator('#bang-gia').getByText('XE NHỎ', { exact: true })).toBeVisible();
    await expect(page.locator('#bang-gia').getByText('Xe lớn', { exact: true })).toBeVisible();
  });

  test('can navigate to gallery page (VI)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /Hình ảnh thực tế/ }).first().click();
    await expect(page).toHaveURL(/du-an-hoan-thanh/);
    await expect(page.getByRole('heading', { level: 1, name: 'Hình ảnh thực tế' })).toBeVisible();
  });

  test('English locale shows translated heading', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Le Dat Moving & Transport',
        includeHidden: true,
      }),
    ).toBeAttached();
    await expect(page.getByRole('link', { name: /Real gallery/i }).first()).toBeVisible();
  });

  test('service page shows readable nav at top (VI)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dich-vu/chuyen-nha-tron-goi', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.getByRole('link', { name: 'Trang chủ' }).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
