import { Locator, Page } from '@playwright/test';

export class HomePage {
  findGameBtn: Locator;
  createGameBtn: Locator;
  optionsBtn: Locator;
  title: Locator;

  constructor(private page: Page) {
    this.findGameBtn = this.page.locator(
      '//button[@data-testid="find-game-btn"]'
    );
    this.createGameBtn = this.page.locator(
      '//button[@data-testid="create-game-btn"]'
    );
    this.optionsBtn = this.page.locator('//button[@data-testid="options-btn"]');
    this.title = this.page.locator('//div[text()="Redneck Activity"]');
  }

  async clickFindGame() {
    await this.findGameBtn.click();
  }

  async clickCreateGame() {
    await this.createGameBtn.click();
  }

  async openOptions() {
    await this.optionsBtn.click();
  }

  async getButtonText(button: Locator): Promise<string> {
    return (await button.textContent()) ?? '';
  }
}
