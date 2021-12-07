const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AlertsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h3');
    }

    get jsAlert() {
        return $('li:nth-child(1) button')
    }

    get jsConfirm() {
        return $('li:nth-child(2) button')
    }

    get jsPrompt() {
        return $('li:nth-child(3) button')
    }
    
}

module.exports = new AlertsPage();
