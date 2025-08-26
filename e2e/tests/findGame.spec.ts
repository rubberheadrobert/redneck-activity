// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FindGamePage } from '../pages/FindGamePage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('can click find game and go back to home page', async ({ page }) => {
  const homePage = new HomePage(page);
  const findGamePage = new FindGamePage(page);

  const homePageTitle = homePage.title;
  await expect(homePageTitle).toBeVisible();

  const findGameBtnText = await homePage.getButtonText(homePage.findGameBtn);
  await expect(findGameBtnText).toContain('Find Game');

  await homePage.clickFindGame();

  const findGamePageTitle = findGamePage.title;
  await expect(findGamePageTitle).toHaveText(/find game/i);

  await findGamePage.clickPreviousPage();
  await expect(homePageTitle).toBeVisible();
});
