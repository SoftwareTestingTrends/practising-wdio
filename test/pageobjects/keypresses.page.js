const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class KeyPressesPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    get result() {
        return $('#result')
    }
}

module.exports = new KeyPressesPage();
