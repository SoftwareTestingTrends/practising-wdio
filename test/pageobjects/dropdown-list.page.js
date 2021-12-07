const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DropdownListPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    get dropdown() {
        return $('#dropdown')
    }

    get option1() {
        return $('#dropdown option:nth-child(2)');
    }

    //or access the element using option value
    get option2() {
        return $('[value="2"]');
    }
   
}

module.exports = new DropdownListPage();
