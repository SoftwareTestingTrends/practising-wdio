//home.page.js
const Page = require('./page');

class AddRemoveElementPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    async getPageHeading() {
        return await this.pageHeading.getText();
    }

}

module.exports = new AddRemoveElementPage();