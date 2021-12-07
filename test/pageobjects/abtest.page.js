const Page = require('./page');

class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    async getPageHeading() {
        return await this.pageHeading.getText();
        
    }

    open() {
        return super.open("abtest") 
    }
}

module.exports = new HomePage();