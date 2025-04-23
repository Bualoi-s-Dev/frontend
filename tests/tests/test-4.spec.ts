// import { test, expect } from '@playwright/test';

// test.use({
//   viewport: {
//     height: 900,
//     width: 415
//   }
// });

// test('test', async ({ page }) => {
//   await page.goto('https://frontend-2gn.pages.dev/user/login');
//   await page.locator('input[type="email"]').click();
//   await page.locator('input[type="email"]').fill('neo.p@gmail.com');
//   await page.locator('input[type="password"]').click();
//   await page.locator('input[type="password"]').fill('123123123');
//   await page.getByRole('button', { name: 'Login', exact: true }).click();
//   await page.getByRole('navigation').getByRole('button').click();
//   await page.goto('https://frontend-2gn.pages.dev/');
// });