import { Locator, Page, expect } from '@playwright/test';

export class AddWordsPage {
  pageTitle: Locator;
  inputContainer: Locator;
  currentPlayer: Locator;
  wordInfoText: Locator;
  wordInput: Locator;
  addWordButton: Locator;
  randomWordBtn: Locator;
  previousPageBtn: Locator;
  nextPageBtn: Locator;
  wordModal: Locator;
  doubleCheckHeading: Locator;
  firstWordInput: Locator;
  secondWordInput: Locator;
  nextPlayerBtn: Locator;

  readonly texts = {
    doubleCheck: 'Double check the words you added!',
  };

  constructor(private page: Page) {
    this.pageTitle = this.page.locator('//h1[text()="Add Words"]');
    this.inputContainer = this.page.locator(
      '//div[@data-testid="input-container"]'
    );
    this.currentPlayer = this.page.locator(
      '//div[@data-testid="input-container"]//h2'
    );
    this.wordInfoText = this.page.locator(
      '//div[@data-testid="input-container"]//p'
    );
    this.wordInput = this.page.locator(
      '//div[@data-testid="input-container"]//input'
    );
    this.addWordButton = this.page.getByRole('button', { name: /add word/i });
    this.randomWordBtn = this.page.locator('//button[text()="Random Word"]');
    this.previousPageBtn = this.page.locator(
      '//button[@aria-label="to-players"]'
    );
    this.nextPageBtn = this.page.locator('//button[@aria-label="to-teams"]');
    this.wordModal = this.page.getByTestId('word-modal');
    this.doubleCheckHeading = this.page.getByText(this.texts.doubleCheck);
    this.firstWordInput = this.page.getByRole('textbox', { name: 'word1' });
    this.secondWordInput = this.page.getByRole('textbox', { name: 'word2' });
    this.nextPlayerBtn = this.page.locator('//button[text()="Next Player"]');
  }

  async addWordManually(word: string) {
    await this.wordInput.fill(word);
    await expect(this.addWordButton).toBeEnabled();
    await this.addWordButton.click();
  }

  async addWordRandomly() {
    await this.randomWordBtn.click();
    await expect(this.addWordButton).toBeEnabled();
    const randomWord = this.wordInput.inputValue();
    await this.addWordButton.click();
    return randomWord;
  }

  async handleWordsPopup(manualWord: string, randomWord: string) {
    await expect(this.wordModal).toBeVisible();
    await expect(this.doubleCheckHeading).toHaveText(this.texts.doubleCheck);
    await expect(this.firstWordInput).toHaveValue(manualWord);
    await expect(this.secondWordInput).toHaveValue(randomWord);
    await this.nextPlayerBtn.click();
  }

  async clickPreviousPage() {
    await this.previousPageBtn.click();
  }

  async clickNextPage() {
    await this.nextPageBtn.click();
  }
}
