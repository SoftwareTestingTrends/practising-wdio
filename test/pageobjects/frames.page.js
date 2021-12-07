const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FramesPage extends Page {
    /**
     * define selectors using getter methods
     */

    get pageHeading() {
        return $('h3');
    }

    get linkIFrame() {
        return $('=iFrame');
    }

    get linkNestedFrame() {
        return $('=Nested Frames');
    }

    get iframe() { 
        return $('#mceu_27 #mce_0_ifr') 
    }

    get iframeBody() { 
        return $('#tinymce') 
    }
}

module.exports = new FramesPage();
