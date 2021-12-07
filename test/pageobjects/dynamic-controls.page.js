const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DynamicControlsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h4');
    }

    get checkBox() {
        return $('#checkbox')
    }

    get message() {
        return $('#message')
    }

    get inputField() {
        return $('#input-example > input[type=text]')
    }

    get btnCheckboxExample() {
        return $('#checkbox-example > button')
    }

    get btnInputExample() {
        return $('#input-example > button')
    }
}

module.exports = new DynamicControlsPage();
