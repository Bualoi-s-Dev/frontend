import { test, expect } from '@playwright/test';

test('test login as customer will see all packages page', async ({ page }) => {
  await page.goto('https://frontend-2gn.pages.dev/user/login');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('customeryok2@gmail.com');
  await page.locator('input[type="email"]').press('Tab');
  await page.locator('input[type="password"]').fill('devyok');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Search...' })).toBeVisible();
});