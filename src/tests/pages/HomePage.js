export class HomePage {
    constructor(page){
        this.page = page
        this.findGameLink = page.getByRole('link', { name: 'Find Game' })
        this.createGameLink = page.getByRole('link', { name: 'Create Game' })
        this.optionsLink = page.getByRole('link', { name: 'Options' })
    }
}

