const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class BasicAuthPage extends Page {
    /**
     * define selectors using getter methods
     */
    get congratsMessage() {
        return $('#content > div > p');
    }

}

module.exports = new BasicAuthPage();

