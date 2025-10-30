import { Locator, Page } from '@playwright/test';

export class FindGamePage {
  connectBtn: Locator;
  title: Locator;
  previousPageBtn: Locator;

  constructor(private page: Page) {
    this.connectBtn = this.page.locator('//button[text()="Connect"]');
    this.title = this.page.locator('//h1[text()="Find Game"]');
    this.previousPageBtn = this.page.locator('//button[@aria-label="to-home"]');
  }

  async clickConnect() {
    await this.connectBtn.click();
  }

  async clickPreviousPage() {
    await this.previousPageBtn.click();
  }

  async getButtonText(button: Locator): Promise<string> {
    return (await button.textContent()) ?? '';
  }
}
