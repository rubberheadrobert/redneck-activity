import { Locator, Page } from '@playwright/test';

export class AddPlayersPage {
  pageTitle: Locator;
  numOfPlayersLabel: Locator;
  numOfTeamsLabel: Locator;
  numOfPlayersInput: Locator;
  numOfTeamsInput: Locator;
  playersInputArea: Locator;
  previousPageBtn: Locator;
  nextPageBtn: Locator;

  constructor(private page: Page) {
    this.pageTitle = this.page.locator('//h1[text()="Add Players"]');
    this.numOfPlayersLabel = this.page.locator(
      '//h2[text()="Number of Players"]'
    );
    this.numOfTeamsLabel = this.page.locator('//h2[text()="Number of Teams"]');
    this.numOfPlayersInput = this.page.locator(
      '//input[@data-testid="num-of-players-input"]'
    );
    this.numOfTeamsInput = this.page.locator(
      '//input[@data-testid="num-of-teams-input"]'
    );
    this.playersInputArea = this.page.locator(
      '//div[@data-testid="player-inputs-area"]'
    );
    this.previousPageBtn = this.page.locator(
      '//button[@aria-label="to-settings-sliders"]'
    );
    this.nextPageBtn = this.page.locator('//button[@aria-label="to-words"]');
  }
  async clickPreviousPage() {
    await this.previousPageBtn.click();
  }

  async clickNextPage() {
    await this.nextPageBtn.click();
  }

  async fillPlayersInputs(playersInputs: Locator[]) {
    for (let i = 0; i < playersInputs.length; i++) {
      await playersInputs[i].fill(`p${i + 1}`);
    }
  }

  async getFilledPlayersInputs() {
    const inputs = await this.playersInputArea.locator('input').all();
    await this.fillPlayersInputs(inputs);
    return inputs;
  }
}
