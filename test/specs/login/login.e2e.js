const LoginPage = require('../../pageobjects/login.page');
const SecurePage = require('../../pageobjects/secure.page');
const loginData = require('../../../data/login-data');
const allureReporter = require('@wdio/allure-reporter').default

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        allureReporter.addStory('Login Story')
        await LoginPage.open();
        await LoginPage.login(loginData.userName, loginData.password);
        browser.debug()
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
    it('should logout from the site', async () => {
        allureReporter.addStory('Logout Story')
        await SecurePage.logOut();  
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged out of the secure area!'); 
    });
});




