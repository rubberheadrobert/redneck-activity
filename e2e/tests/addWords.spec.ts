import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SettingsSlidersPage } from '../pages/SettingsSlidersPage';
import { AddWordsPage } from '../pages/AddWordsPage';
import {} from '../../src/utils/texts';
import { AddPlayersPage } from '../pages/AddPlayersPage';

const expectedPlayers = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
const words = ['one', 'two', 'three', 'four', 'five', 'six'];

async function initTest(page) {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const settingsSlidersPage = new SettingsSlidersPage(page);
  const addPlayersPage = new AddPlayersPage(page);

  await homePage.clickCreateGame();
  await expect(settingsPage.teamsHeader).toBeVisible();
  await settingsPage.clickNextPage();
  await expect(settingsSlidersPage.roundLengthHeader).toBeVisible();
  await settingsSlidersPage.clickNextPage();
  await expect(addPlayersPage.pageTitle).toBeVisible();
  const playersInputs = await addPlayersPage.playersInputArea
    .locator('input')
    .all();
  await addPlayersPage.fillPlayersInputs(playersInputs);
  await addPlayersPage.clickNextPage();
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await initTest(page);
});

test.describe('Add Words page tests', () => {
  test('components are loaded', async ({ page }) => {
    const addWordsPage = new AddWordsPage(page);
    await expect(addWordsPage.pageTitle).toHaveText('Add Words');
    await expect(addWordsPage.currentPlayer).toHaveText(expectedPlayers[0]);
    await expect(addWordsPage.wordInput).toBeEmpty();
  });

  test.only('players can add words manually and via random word api', async ({
    page,
  }) => {
    const addWordsPage = new AddWordsPage(page);
    for (let i = 0; i < expectedPlayers.length; i++) {
      await addWordsPage.addWordManually(words[i]);
      const randomWord = await addWordsPage.addWordRandomly();
      await addWordsPage.handleWordsPopup(words[i], randomWord);
    }
  });
});
