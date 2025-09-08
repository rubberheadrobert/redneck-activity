import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SettingsSlidersPage } from '../pages/SettingsSlidersPage';
import { AddPlayersPage } from '../pages/AddPlayersPage';
import {} from '../../src/utils/texts';

async function initTest(page) {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const settingsSlidersPage = new SettingsSlidersPage(page);

  await homePage.clickCreateGame();
  await expect(settingsPage.teamsHeader).toBeVisible();
  await settingsPage.clickNextPage();
  await expect(settingsSlidersPage.roundLengthHeader).toBeVisible();
  await settingsSlidersPage.clickNextPage();
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await initTest(page);
});

test.describe('Add players page tests', () => {
  test('default values are correct', async ({ page }) => {
    const addPlayersPage = new AddPlayersPage(page);
    await expect(addPlayersPage.pageTitle).toHaveText('Add Players');
    await expect(addPlayersPage.numOfPlayersInput).toHaveValue('6');
    await expect(addPlayersPage.numOfTeamsInput).toHaveValue('2');
    await expect(addPlayersPage.playersInputArea.locator('input')).toHaveCount(
      6
    );
  });
  test('changing number of players value changes number of player input fields', async ({
    page,
  }) => {
    const addPlayersPage = new AddPlayersPage(page);
    await addPlayersPage.numOfPlayersInput.clear();
    await addPlayersPage.numOfPlayersInput.fill('4');
    await expect(addPlayersPage.playersInputArea.locator('input')).toHaveCount(
      4
    );
  });
  test('able to add player names to player input fields', async ({ page }) => {
    const addPlayersPage = new AddPlayersPage(page);
    const playersInputs = await addPlayersPage.playersInputArea
      .locator('input')
      .all();
    await addPlayersPage.fillPlayersInputs(playersInputs);
    for (let i = 0; i < playersInputs.length; i++) {
      await expect(playersInputs[i]).toHaveValue(`p${i + 1}`);
    }
  });
});
