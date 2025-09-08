// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('can click create game and go back to home page', async ({ page }) => {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  const homePageTitle = homePage.title;
  await expect(homePageTitle).toHaveText('Redneck Activity');

  const findGameBtnText = await homePage.getButtonText(homePage.findGameBtn);
  await expect(findGameBtnText).toContain('Find Game');

  await homePage.clickCreateGame();

  const settingsPageTitle = settingsPage.title;
  await expect(settingsPageTitle).toHaveText(/settings/i);

  await settingsPage.clickPreviousPage();
  await expect(homePageTitle).toBeVisible();
});
