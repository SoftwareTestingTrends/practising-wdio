describe('Webdriver.io examples', () => {
    it('TC000_My First Test Case', () => {
        browser.url('https://www.google.com/')
        expect(browser).toHaveTitle('Google')
     })
     it.only('TC001_Taking Element Screenshot', () => {
        browser.url('https://ultimateqa.com/complicated-page/')
        browser.pause(5000)
        $('.spaceManWilly').saveScreenshot('Screenshots/TC001.png')
    })
})