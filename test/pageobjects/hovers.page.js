const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HoversPage extends Page {
    /**
     * define selectors using getter methods
     */
    get hoverUser1() {
        return $('.figure:nth-child(3) img');
    }

    get user1Name() {
        return $('.figure:nth-child(3) .figcaption h5')
    }

    get user1ProfileLink() {
        return $('.figure:nth-child(3) .figcaption a')
    }

}

module.exports = new HoversPage();
