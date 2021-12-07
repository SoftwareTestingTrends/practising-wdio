const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert() {
        return $('#flash');
    }

    get btnLogOut() {
        return $('.icon-signout')
    }

    async logOut() {
        await this.btnLogOut.click();
    }
}

module.exports = new SecurePage();
