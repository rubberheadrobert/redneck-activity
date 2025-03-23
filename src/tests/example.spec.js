// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test('navigate to game page', async ({ page }) => {
  const homePage = new HomePage(page)
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await homePage.createGameLink.click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

  await page.locator('button[name="teams-random"]').click();
  await page.locator('button[name="single-phone"]').click();
  await page.locator('button[name="settings-sliders"]').click()

  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Round Length' })).toBeVisible();

  const sliderHandle = page.locator('#round-length-area .rc-slider-handle');

  await expect(sliderHandle).toBeVisible()
});
