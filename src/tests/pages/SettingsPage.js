export class SettingsPage {
    constructor(page){
        this.page = page
        this.randomTeamsBtn = page.locator('button[name="teams-random"]')
        this.nonRandomTeamsBtn = page.locator('button[name="teams-nonrandom"]')
        this.singlePhoneBtn = page.locator('button[name="single-phone"]')
        this.multiPhoneBtn = page.locator('button[name="multiple-phones"]')
    }
}

