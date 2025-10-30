import { Locator, Page } from '@playwright/test';

export class SettingsSlidersPage {
  pageTitle: Locator;
  roundLengthHeader: Locator;
  roundLengthSliderHandler: Locator;
  roundLengthValue: Locator;
  roundLengthText: Locator;
  wordsAmountHeader: Locator;
  wordsAmountSliderHandler: Locator;
  wordsAmountValue: Locator;
  wordsAmountText: Locator;
  previousPageBtn: Locator;
  nextPageBtn: Locator;

  constructor(private page: Page) {
    this.pageTitle = this.page.locator('//h1[text()="Settings"]');
    this.roundLengthHeader = this.page.locator('//h2[text()="Round Length"]');
    this.roundLengthSliderHandler = this.page.locator(
      '//div[@id="round-length-area"]//div[@class="rc-slider-handle"]'
    );
    this.roundLengthValue = this.page.locator(
      '//div[@id="round-length-area"]//span'
    );
    this.roundLengthText = this.page.locator(
      '//div[@id="round-length-area"]//p'
    );
    this.wordsAmountHeader = this.page.locator('//h2[text()="Words Amount"]');
    this.wordsAmountSliderHandler = this.page.locator(
      '//div[@id="words-amount-area"]//div[@class="rc-slider-handle"]'
    );
    this.wordsAmountValue = this.page.locator(
      '//div[@id="words-amount-area"]//span'
    );
    this.wordsAmountText = this.page.locator(
      '//div[@id="words-amount-area"]//p'
    );
    this.previousPageBtn = this.page.locator('//button[@name="settings"]');
    this.nextPageBtn = this.page.locator('//button[@name="players"]');
  }

  async getButtonText(button: Locator): Promise<string> {
    return (await button.textContent()) ?? '';
  }

  async clickPreviosPage() {
    await this.previousPageBtn.click();
  }

  async clickNextPage() {
    await this.nextPageBtn.click();
  }

  async moveSliderHandler(
    direction: 'ArrowLeft' | 'ArrowRight',
    distance: number,
    slider: Locator
  ) {
    await slider.focus();
    for (let i = 0; i < distance; i++) {
      await slider.press(direction);
    }
  }
}
