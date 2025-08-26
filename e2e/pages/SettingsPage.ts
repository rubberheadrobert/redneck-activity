import { Locator, Page } from '@playwright/test';

export class SettingsPage {
  randomBtn: Locator;
  nonRandomBtn: Locator;
  singlePhoneBtn: Locator;
  multiPhoneBtn: Locator;
  teamsText: Locator;
  phonesText: Locator;
  teamsHeader: Locator;
  phonesHeader: Locator;
  title: Locator;
  previousPageBtn: Locator;
  nextPageBtn: Locator;

  constructor(private page: Page) {
    this.randomBtn = this.page.locator('//button[@name="teams-random"]');
    this.nonRandomBtn = this.page.locator('//button[@name="teams-nonrandom"]');
    this.singlePhoneBtn = this.page.locator('//button[@name="single-phone"]');
    this.multiPhoneBtn = this.page.locator('//button[@name="multiple-phones"]');
    this.teamsText = this.page.locator('//p[@data-testid="teams-info"]');
    this.phonesText = this.page.locator('//p[@data-testid="phones-info"]');
    this.teamsHeader = this.page.locator('//h2[text()="Teams"]');
    this.phonesHeader = this.page.locator('//h2[text()="Game Type"]');
    this.title = this.page.locator('//h1[text()="Settings"]');
    this.previousPageBtn = this.page.locator('//button[@aria-label="to-home"]');
    this.nextPageBtn = this.page.locator(
      '//button[@aria-label="to-settings-sliders"]'
    );
  }

  async getButtonText(button: Locator): Promise<string> {
    return (await button.textContent()) ?? '';
  }

  async clickPreviousPage() {
    await this.previousPageBtn.click();
  }

  async clickNextPage() {
    await this.nextPageBtn.click();
  }
}
