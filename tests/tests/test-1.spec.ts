import { test, expect } from '@playwright/test';

test('test login as photographer will see your packages page', async ({ page }) => {
  await page.setViewportSize({ width: 415, height: 900 });
  
  await page.goto('https://frontend-2gn.pages.dev/user/login');
  await page.locator('input[type="email"]').click();
  // Name is misleading, this user is Photographer :)
  await page.locator('input[type="email"]').fill('customeryok@gmail.com');
  await page.locator('input[type="email"]').press('Tab');
  await page.locator('input[type="password"]').fill('devyok');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your Packages' })).toBeVisible();
});