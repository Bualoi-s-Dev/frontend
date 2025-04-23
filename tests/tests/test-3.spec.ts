import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 415
  }
});

test('test', async ({ page }) => {
  await page.goto('https://frontend-2gn.pages.dev/user/login');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('neo.ccc@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123123123');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.getByRole('button', { name: 'My First Package' }).click();
  await page.getByRole('button', { name: 'Afternoon package Only onsite' }).click();
  await page.locator('[data-test-id="dp-input"]').click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.getByText('18').click();
  await page.locator('[data-test-id="select-button"]').click();
  await page.getByRole('button', { name: ':31 PM - 04:01 PM' }).click();
  await page.locator('#location').click();
  await page.locator('#location').fill('Rayong');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.goto('https://frontend-2gn.pages.dev/package/68067dbff04a218e17b4e67d/subpackage/appointment/create/68067e87f04a218e17b4e67f?date=Sun+May+18+2025+07%3A00%3A00+GMT%2B0700+%28Indochina+Time%29&start=02%3A31+PM&end=04%3A01+PM');
});