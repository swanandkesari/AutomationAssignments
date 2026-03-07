export class crickinfoBatPagePOM {
    constructor(page) {
        this.page = page;
        this.batsmantable = this.page.locator("//table[@class='engineTable'][caption[text()='Overall figures']]");
        this.batsmantablerows = this.batsmantable.locator('tbody tr');
    }

    async goto() {
        await this.page.goto("https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;template=results;type=batting");
    }


}
