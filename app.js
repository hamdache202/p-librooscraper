const webdriver = require('selenium-webdriver');

async function bookjuisescraper() {
    let chromeCapabilities = webdriver.Capabilities.chrome();
    /*var chromeOptions = {'args' : ['--headless']}; chromeCapabilities.set('chromeOptions', chromeOptions);*/
    let driver = await new webdriver.Builder().withCapabilities(chromeCapabilities).forBrowser('chrome').build();
    try {
        let next = true;
        let currentPage = 'https://www.booksjuice.com/books-archive/page/5/';
        while (next) {
            await driver.get(currentPage);
            let books = await driver.findElements(webdriver.By.xpath("//div[contains(@class,'archiveItem')]/a"));
            console.log('------------------------------');
            let bookUrl = decodeURI(await books[0].getAttribute('href'));
            console.log(bookUrl);
            /*for (let i = 0; i < books.length; i++) {
                const book = books[i];
                let bookUrl = decodeURI(await book.getAttribute('href'));
                console.log(bookUrl);
            }*/

            //get next page url
            try {
                let nextBtn = await driver.findElement(webdriver.By.xpath("//a[contains(@class,'nextpostslink')]"));
                next = true;
                currentPage = decodeURI(await nextBtn.getAttribute('href'));
                console.log('-> current : '+currentPage);
            } catch (error) {
                next = false; 
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        await driver.quit();
    }
}



bookjuisescraper();