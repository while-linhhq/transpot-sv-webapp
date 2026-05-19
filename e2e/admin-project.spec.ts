import { test, expect } from '@playwright/test';

const API = 'http://localhost:4000/api/v1';

async function loginViaApi(page: import('@playwright/test').Page) {
  const res = await page.request.post(`${API}/auth/login`, {
    data: { email: 'admin@vanchuyenledat.vn', password: 'Admin@123456' },
  });
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  const { accessToken, refreshToken } = json.data;

  await page.goto('/admin/login');
  await page.evaluate(
    ({ accessToken, refreshToken }) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    { accessToken, refreshToken }
  );
}

test.describe('Admin CMS', () => {
  test('login form and view projects list', async ({ page }) => {
    await loginViaApi(page);
    await page.goto('/admin/projects');
    await expect(page.getByRole('heading', { name: 'Quản lý dự án' })).toBeVisible({
      timeout: 10000,
    });
  });

  test('create draft project via API', async ({ request }) => {
    const loginRes = await request.post(`${API}/auth/login`, {
      data: { email: 'admin@vanchuyenledat.vn', password: 'Admin@123456' },
    });
    const { accessToken } = (await loginRes.json()).data;
    const title = `E2E Test ${Date.now()}`;

    const createRes = await request.post(`${API}/projects`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        title,
        excerpt: 'Mô tả test',
        contentHtml: '<p>Nội dung E2E</p>',
        status: 'DRAFT',
        tags: ['e2e'],
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const created = (await createRes.json()).data;
    expect(created.title).toBe(title);
  });

  test('editor form loads', async ({ page }) => {
    await loginViaApi(page);
    await page.goto('/admin/projects/new');
    await expect(page.getByLabel('Tiêu đề *')).toBeVisible();
    await expect(page.locator('.ProseMirror')).toBeVisible();
  });
});
