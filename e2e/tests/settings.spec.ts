// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { settingsTexts } from '../../src/utils/texts';
import { SettingsSlidersPage } from '../pages/SettingsSlidersPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Settings Page', () => {
  test('can select between random and non-random teams correctly', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.clickCreateGame();
    await expect(settingsPage.teamsHeader).toBeVisible();

    await settingsPage.nonRandomBtn.click();
    await expect(settingsPage.teamsText).toHaveText(
      settingsTexts.teamsNotRandomized
    );

    await settingsPage.randomBtn.click();
    await expect(settingsPage.teamsText).toHaveText(
      settingsTexts.teamsRandomized
    );
  });
  test('can select between single and multiple phones correctly', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.clickCreateGame();
    await expect(settingsPage.phonesHeader).toBeVisible();

    await settingsPage.multiPhoneBtn.click();
    await expect(settingsPage.phonesText).toHaveText(
      settingsTexts.featureNotImplemented
    );

    await settingsPage.singlePhoneBtn.click();
    await expect(settingsPage.phonesText).toHaveText(settingsTexts.singlePhone);
  });
});
