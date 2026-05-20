import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows brand', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Taxi Tải|Lê Đạt/i })
    ).toBeVisible();
  });

  test('navigation has Dự án hoàn thành', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Dự án hoàn thành' }).first()).toBeVisible();
  });

  test('pricing section is visible', async ({ page }) => {
    await page.goto('/#bang-gia');
    await expect(page.getByRole('heading', { name: /BẢNG GIÁ CƯỚC XE/i })).toBeVisible();
    await expect(page.getByText('XE NHỎ')).toBeVisible();
    await expect(page.getByText('Xe lớn')).toBeVisible();
  });

  test('can navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Dự án hoàn thành' }).first().click();
    await expect(page).toHaveURL(/du-an-hoan-thanh/);
    await expect(
      page.getByRole('heading', { name: 'Dự án hoàn thành', exact: true })
    ).toBeVisible();
  });
});
