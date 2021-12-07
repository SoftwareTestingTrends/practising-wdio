const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DragAndDropPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    get sourceColumn() {
        return $('#column-a')
    }

    get targetColumn() {
        return $('#column-b')
    }

    get targetColumnHeader() {
        return $('#column-b > header')
    }
}

module.exports = new DragAndDropPage();
