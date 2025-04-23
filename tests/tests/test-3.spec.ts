import { test, expect } from '@playwright/test';
import { setTimeout } from 'node:timers/promises';

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
  await page.locator('[data-test-id="dp-2025-05-12"]').getByText('12').click();
  await page.locator('[data-test-id="select-button"]').click();
  await page.getByRole('button', { name: ':01 PM - 02:31 PM' }).click();
  await page.locator('#location').click();
  await page.locator('#location').fill('Rayong');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await setTimeout(10000);
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('Appointments').click();
  await expect(page.getByRole('heading', { name: 'My First Package / Afternoon' }).first()).toBeVisible();
  await page.goto('https://frontend-2gn.pages.dev/appointment/list');
});