const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
jest.setTimeout(100000);
const { querySelector } = require('./helpers')
const rootURL = 'http://localhost:3000/patient/measurements'

beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build()
  })
  
  afterAll(async () => driver.quit())

it('initialises the context', async () => {
    await driver.get(rootURL)
})

it('should click on the notification symbol in patient/measurements and accept unexpected value', async () => {
        //Locate and click on notification symbol
        let notification = await driver.findElement(By.id(''));
        await driver.wait(until.elementIsVisible(notification), 3000);
        notification.click();
        await new Promise(r => setTimeout(r, 1500));

        //Locate and click on the "Neka/Avbryt"-button in popup window
        let denyButt = await driver.findElement(By.id(''));
        await driver.wait(until.elementIsVisible(denyButt), 3000);
        denyButt.click();
        await new Promise(r => setTimeout(r, 1500));

        // Check that notification symbol is no longer present on page
        assert(!notification.isDisplayed());

        //Maybe something to check if measurement value has been deleted?
})