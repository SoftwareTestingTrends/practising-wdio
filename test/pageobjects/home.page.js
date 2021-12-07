const Page = require('./page');

class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageHeading() {
        return $('h1.heading');
    }

    get pageSubheading() {
        return $('#content > h2')
    }

    get pageFooter() {
        return $('#page-footer')
    }

    get pageLinkABTesting()  {
        return $('ul > li:nth-child(1) > a')
    }

    get pageLinkAddRemoveElement()  {
        return $('ul > li:nth-child(2) > a')
    }

    get itemList() { return $('ul').$$('li') }

    get pageLinkCheckbox()  {
        return $('ul > li:nth-child(6) > a')
    }

    get pageLinkHover() {
        return $('=Hovers')
    }

    get pageLinkKeyPresses() {
        return $('=Key Presses')
    }

    get pageLinkMultipleWindows() {
        return $('=Multiple Windows')
    }

    get pageFrames() {
        return $('=Frames')
    }

    get pageLinkDragAndDrop() {
        return $('=Drag and Drop')
    }

    get pageLinkDropdownList() {
        return $('=Dropdown')
    }

    get pageLinkJavascriptAlerts() {
        return $('=JavaScript Alerts')
    }

    get pageLinkDynamicControls() {
        return $('=Dynamic Controls')
    }



    // async getLiText() {
    //     await this.itemList.filter((element) => {
    //         element.getText()
    //     })
    // }

    // async item(param) { return await $('ul > li:nth-child(1)')}

    // async specificListElement(index) { return await this.item(1).getText() }

    // async getSpecificElementText(index) {
    //     this.specificListElement(index).getText()
    // }


    // get parent() { return $('ul') }
    // specificChildElement(index) { return this.parent.$(`li:nth-child(${index})`) }
    // getSpecificElementText(index) {
    // console.log (this.specificChildElement(index).getText())
    // }


    async getPageHeading() {
        return await this.pageHeading.getText();
        
    }

    async getPageSubheading() {
        return await this.pageSubheading.getText();
    }


    async getPageFooter() {
            return await this.pageFooter.getText();
            
    }
    
    open() {
        return browser.url(`https://the-internet.herokuapp.com/`)
    }
}

module.exports = new HomePage();
