const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class CheckBoxPage extends Page {
    /**
     * define selectors using getter methods
     */

    get pageHeading() {
        return $('h3');
    }

    get checkBox1() {
        return $('input[type=checkbox]:nth-child(1)')
    }

    get checkBox2() {
        return $('input[type=checkbox]:nth-child(3)')
    }

}

module.exports = new CheckBoxPage();