// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SettingsSlidersPage } from '../pages/SettingsSlidersPage';
import { settingsTexts } from '../../src/utils/texts';

async function initTest(page) {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  await homePage.clickCreateGame();
  await expect(settingsPage.teamsHeader).toBeVisible();
  await settingsPage.clickNextPage();
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('default values are correct', async ({ page }) => {
  initTest(page);
  const settingsSlidersPage = new SettingsSlidersPage(page);

  await expect(settingsSlidersPage.roundLengthValue).toHaveText('30');
  await expect(settingsSlidersPage.wordsAmountValue).toHaveText('5');
});

test('can change round length slider value', async ({ page }) => {
  initTest(page);
  const settingsSlidersPage = new SettingsSlidersPage(page);

  await expect(settingsSlidersPage.roundLengthHeader).toBeVisible();

  await settingsSlidersPage.moveSliderHandler(
    'ArrowRight',
    10,
    settingsSlidersPage.roundLengthSliderHandler
  );
  await expect(settingsSlidersPage.roundLengthValue).toHaveText('40'!);
  await expect(settingsSlidersPage.roundLengthText).toContainText('40');
});
test('can change words amount slider value', async ({ page }) => {
  initTest(page);
  const settingsSlidersPage = new SettingsSlidersPage(page);

  await expect(settingsSlidersPage.wordsAmountHeader).toBeVisible();

  await settingsSlidersPage.moveSliderHandler(
    'ArrowRight',
    5,
    settingsSlidersPage.wordsAmountSliderHandler
  );
  await expect(settingsSlidersPage.wordsAmountValue).toHaveText('10'!);
  await expect(settingsSlidersPage.wordsAmountValue).toContainText('10');
});
