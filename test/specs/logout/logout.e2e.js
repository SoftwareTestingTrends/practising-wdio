const LoginPage = require('../../pageobjects/login.page');
const SecurePage = require('../../pageobjects/secure.page');

describe('User can log out from the site', () => {
    it('should logout from the site', async () => {
        await LoginPage.open();
        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
        await SecurePage.logOut();  
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged out of the secure area!'); 
    });
});





