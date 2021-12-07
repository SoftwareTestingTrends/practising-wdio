const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MultipleWindowsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    get newWindowLink() {
        return $('=Click Here')
    }

    get newWindowHeading() {
        return $('h3')
    }

}

module.exports = new MultipleWindowsPage();
