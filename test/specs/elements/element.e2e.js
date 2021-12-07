const HomePage = require('../../pageobjects/home.page');
const ABTestPage = require('../../pageobjects/abtest.page')
const AddRemoveElementPage = require('../../pageobjects/add-remove-elements.page')
const BasicAuthPage = require('../../pageobjects/basic_auth.page')
const CheckboxPage = require('../../pageobjects/checkbox.page')
const allureReporter = require('@wdio/allure-reporter').default;
const HoversPage = require('../../pageobjects/hovers.page')
const KeyPressesPage = require('../../pageobjects/keypresses.page');
const MultipleWindowsPage = require('../../pageobjects/multiple_windows.page');
const FramesPage = require('../../pageobjects/frames.page');
const DragAndDropPage = require('../../pageobjects/drag-and-drop.page');
const DropdownListPage = require('../../pageobjects/dropdown-list.page');
const AlertsPage = require('../../pageobjects/alerts.page');
const DynamicControlsPage = require('../../pageobjects/dynamic-controls.page');

// const { expect } = require('chai');

describe("Interacting with page elements", () => {
    it("should get the text from the page elements", async () => {
        allureReporter.addStory('Getting the text from the page elements')
        await HomePage.open();
        //Using Chai Assertions:
        // let heading = await HomePage.getPageHeading();
        // let subHeading = await HomePage.getPageSubheading();
        // let pageFooter = await HomePage.getPageFooter();
        // expect(heading).to.equal("Welcome to the-internet");
        // expect(subHeading).to.equal("Available Examples");
        // expect(pageFooter).to.equal("Powered by Elemental Selenium");
        // console.log('Page Footer...', pageFooter);

        //Using WebdriverIO Expect Library

        let heading = await HomePage.pageHeading;
        let subHeading = await HomePage.pageSubheading;
        let pageFooter = await HomePage.pageFooter;
        expect(heading).toHaveTextContaining("Welcome to the-internet");
        expect(subHeading).toHaveTextContaining("Available Examples");
        expect(pageFooter).toHaveTextContaining("Powered by Elemental Selenium");
    })

    it("should be able to click on element", async () => {
        allureReporter.addStory('Clicking a link to navigate to another page')
        await HomePage.open();
        await HomePage.pageLinkAddRemoveElement.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/add_remove_elements/')
        await expect(browser).toHaveTitle('The Internet')
        expect(await AddRemoveElementPage.pageHeading).toHaveTextContaining("Add/Remove Elements")
    })

    it("should be able to get a list of elements", async () => {
        allureReporter.addStory('Getting a list of elements displayed on the page')
        await HomePage.open();
        const pageLinksLists = await HomePage.itemList
        const pageLinksArray = []
        
        for(const li of pageLinksLists) {
            pageLinksArray.push(await li.getText())
        }
        console.log('pageLinksArray', pageLinksArray)
    })

    it('should save a screenshot of the element', async () => {
        await HomePage.open();
        await HomePage.pageLinkAddRemoveElement.click();
        const elem = await AddRemoveElementPage.pageHeading;
        await elem.saveScreenshot('./screenshots/elemScreenshot.png');
    });

    it('Should be able to authenticate', async () => {
        await browser.url('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        browser.pause(5000)
        // await BasicAuthPage.congratsMessage.toHaveTextContaining("Congratulations! You must have the proper credentials.")
    })

    it('Should be able to get all Links from the webpage', async () => {
        await HomePage.open();
        const arrayList = []
        const elems = await $$('<a />')
        // for (let item of elems) {
        //     const itemName = await item.getAttribute('href')
        //     arrayList.push(itemName)
        // }
        // https://stackoverflow.com/questions/67710794/find-function-with-await-does-not-work-while-using-webdriverio
        await Promise.all(
        elems.map(async (item) => {
            const itemName = await item.getAttribute('href')
            arrayList.push(itemName)
        })
        );
        console.log('Items***', arrayList)
    })   

    it('Should scroll into view', async () => {
        await browser.url('https://the-internet.herokuapp.com/')
        await browser.saveScreenshot('screenshots/before-scrolling.png')
        await HomePage.pageFooter.scrollIntoView()
        await expect(HomePage.pageFooter).toBeDisplayedInViewport()
        await browser.saveScreenshot('./screenshots/after-scrolling.png')
    }) 

    it('Should set a value', async () => {
        await browser.url('https://jqueryui.com/')
        await $('[name="s"]').saveScreenshot('Screenshots/TC028_before.png')
        await $('[name="s"]').setValue("CSS Framework")
        await $('[name="s"]').saveScreenshot('Screenshots/TC028_after.png')
    })

    it('Should click a checkbox', async () => {
        await HomePage.open();
        await HomePage.pageLinkCheckbox.click()
        expect(await CheckboxPage.pageHeading.getText()).toHaveTextContaining('Checkboxes');
        await CheckboxPage.checkBox1.click()
        console.log('isSelected: ', await CheckboxPage.checkBox1.isSelected()); 
        // expect(await CheckboxPage.checkBox1.isSelected()).equals('true');
        await CheckboxPage.checkBox2.click()
        console.log('isNotSelected: ', await CheckboxPage.checkBox2.isSelected()); 
    })

    it('Should hover(mouse) over an object', async () => {
        await HomePage.open();
        await HomePage.pageLinkHover.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/hovers')
        await HoversPage.hoverUser1.moveTo();
        expect(await HoversPage.user1Name.getText()).toHaveTextContaining('name: user1')
        await HoversPage.user1ProfileLink.click()
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/users/1')
    })

    it('Should send a keyboard key', async () => {
        await HomePage.open();
        await HomePage.pageLinkKeyPresses.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/key_presses')
        expect(await KeyPressesPage.pageHeading.getText()).toHaveTextContaining('Key Presses')
        await browser.keys('Enter')
        expect(await KeyPressesPage.result.getText()).toHaveTextContaining('You entered: Enter')
    })

    it('Should open a new window', async () => {
        await HomePage.open();
        await HomePage.pageLinkMultipleWindows.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/windows')
        expect(await MultipleWindowsPage.pageHeading.getText()).toHaveTextContaining('Opening a new window')
        await MultipleWindowsPage.newWindowLink.click();
        await browser.switchWindow('https://the-internet.herokuapp.com/windows/new')
        expect(await browser.getTitle()).toHaveTextContaining('New Window')
        expect(await MultipleWindowsPage.newWindowHeading.getText()).toHaveTextContaining('New Window')
    })

    //Switching Between Frames
    it('Should switch to a frame', async () => {
        await HomePage.open();
        await HomePage.pageFrames.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/frames')
        expect(await FramesPage.pageHeading.getText()).toHaveTextContaining('Frames')
        await FramesPage.linkIFrame.click()
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/iframe')
        expect(await browser.getTitle()).toHaveTextContaining('New Window')
        expect(await FramesPage.pageHeading.getText()).toHaveTextContaining('An iFrame containing the TinyMCE WYSIWYG Editor')
        //Switch iFrame
        await browser.switchToFrame(0)
        expect(await FramesPage.iframeBody.getText()).toHaveTextContaining('Your content goes here.')
        console.log('Text inside frame: ' + await FramesPage.iframeBody.getText())
        await FramesPage.iframeBody.clearValue();
        await FramesPage.iframeBody.click();
        await FramesPage.iframeBody.setValue('Testing in Progress')
        expect(await FramesPage.iframeBody.getValue()).toHaveTextContaining('Testing in Progress')
        browser.switchToParentFrame()
        expect(await FramesPage.pageHeading.getText()).toHaveTextContaining('An iFrame containing the TinyMCE WYSIWYG Editor')
        console.log('Webpage Heading on parent frame: ' + await FramesPage.pageHeading.getText())
    })

    //Drag & Drop 
    it('should demonstrate the dragAndDrop command', async () => {
        await HomePage.open();
        await HomePage.pageLinkDragAndDrop.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/drag_and_drop')
        expect(await DragAndDropPage.pageHeading.getText()).toHaveTextContaining('Drag and Drop')
        const source = await DragAndDropPage.sourceColumn
        const target = await DragAndDropPage.targetColumn
        
        // drag and drop source to target element
        await source.dragAndDrop(target)

        // await DragAndDropPage.sourceColumn.dragAndDrop(DragAndDropPage.targetColumn)
        expect(await DragAndDropPage.targetColumnHeader.getText()).toHaveTextContaining('A')
    })

    //Dropdown List 
    it('should demonstrate the dropdown list', async () => {
        await HomePage.open();
        await HomePage.pageLinkDropdownList.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dropdown')
        expect(await DropdownListPage.pageHeading.getText()).toHaveTextContaining('Dropdown List')
        
        const option1 = await DropdownListPage.option1
        const option2 = await DropdownListPage.option2

        await DropdownListPage.dropdown.click()
        option1.click()
        console.log('option 1: ', await option1.getText())

        option2.click()
        console.log('option 2: ', await option2.getText())
    })

    //Handling Alerts
    it('should demonstrate the handling of JS Alerts', async () => {
        await HomePage.open();
        await HomePage.pageLinkJavascriptAlerts.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/javascript_alerts')
        expect(await AlertsPage.pageHeading.getText()).toHaveTextContaining('JavaScript Alerts')
        
        // Alerts not working for WebdriverIO7: https://github.com/webdriverio/webdriverio/issues/6423
        await AlertsPage.jsAlert.click();
        browser.acceptAlert();

        // const alertText = await browser.getAlertText()
        // console.log('alertText', alertText)
        // expect(await browser.getAlertText()).toHaveTextContaining('I am a JS Alert')
        // browser.acceptAlert();

        // await AlertsPage.jsConfirm.click();
        // expect(await browser.getAlertText()).toHaveTextContaining('I am a JS Confirm')
        // browser.acceptAlert();

        // await AlertsPage.jsPrompt.click();
        // await browser.sendAlertText('Testing')
        // expect(await browser.getAlertText()).toHaveTextContaining('Testing')
        // browser.acceptAlert();
    })

    //Dynamic Controls - Enabled/Disabled State
    it('should demonstrate the use of dynamic controls - Enabled/Disabled State', async () => {
        await HomePage.open();
        await HomePage.pageLinkDynamicControls.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dynamic_controls')
        expect(await DynamicControlsPage.pageHeading.getText()).toHaveTextContaining('Dynamic Controls')
        
        let inputState = await DynamicControlsPage.inputField.isEnabled()
        console.log('inputState:(', inputState)

        await DynamicControlsPage.btnInputExample.click()
        await DynamicControlsPage.inputField.waitForEnabled()
        
        inputState = await DynamicControlsPage.inputField.isEnabled()
        console.log('inputState:*)', inputState)

        if(inputState) {
            await DynamicControlsPage.inputField.setValue('Testing in progress')
            await DynamicControlsPage.btnInputExample.click()
            await DynamicControlsPage.inputField.waitForEnabled({reverse: true})
            expect(await DynamicControlsPage.inputField.getValue()).toHaveTextContaining('Testing in progress')
        }
    })

    //Dynamic Controls - Existence/non-existence of an element
    it.only('should demonstrate the use of dynamic controls - Existence/non-existence of an element', async () => {
        await HomePage.open();
        await HomePage.pageLinkDynamicControls.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dynamic_controls')
        expect(await DynamicControlsPage.pageHeading.getText()).toHaveTextContaining('Dynamic Controls')
        
        let existState = await DynamicControlsPage.checkBox.isExisting()
        console.log('should exists:', existState)

        if(existState) {
            await DynamicControlsPage.checkBox.click()
            console.log('Checkbox is in checked state: ' , await DynamicControlsPage.checkBox.isSelected())
            
        }

        await DynamicControlsPage.btnCheckboxExample.click()
        await DynamicControlsPage.checkBox.waitForDisplayed({reverse: true})

        existState = await DynamicControlsPage.checkBox.isExisting()
        console.log('should exists:', existState)

        if(!existState) {
            console.log('Checkbox is not displayed anymore...')
            expect(await DynamicControlsPage.message.getText()).toHaveTextContaining("It's gone!")
        }

        await DynamicControlsPage.btnCheckboxExample.click()
        await DynamicControlsPage.checkBox.waitForDisplayed()
        expect(await DynamicControlsPage.message.getText()).toHaveTextContaining("It's back!")

    })
})
describe("Usage of 'waitUntil' for a certain condition", () => {
    it("should wait until a certain condition occurs", async () => {
        await HomePage.open();
        await HomePage.pageLinkDynamicControls.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dynamic_controls')
        expect(await DynamicControlsPage.pageHeading.getText()).toHaveTextContaining('Dynamic Controls')
        await DynamicControlsPage.btnCheckboxExample.click()

        // $(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
        await DynamicControlsPage.btnCheckboxExample.waitUntil(async () => {
            return (await this.getText()) === 'Add'
        }, {
            timeout: 10000,
            timeoutMsg: 'expected text to be different after 10s'
        });
    })
})
