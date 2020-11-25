const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
jest.setTimeout(100000);
const { querySelector } = require('./helpers')
const rootURL = 'localhost:3000/patient/overview'

beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build()
  })
  
  afterAll(async () => driver.quit())

it('initialises the context', async () => {
    await driver.get(rootURL)
})

it('should navigate from patient/overview, to patient/measurements, click on a measurement and fill in new values', async () => {
    //Navigate from Patient/Overview
    let measurementTab = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(measurementTab), 3000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Locate and click on a measurement value in a graph
    let measurementVal = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(measurementVal), 3000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Locate text (date and measurement) fields and fill in new date and measurements 
    let measureDate = await driver.findElement(By.id('')); //has a name="date", awaiting ID
    await driver.wait(until.elementIsVisible(measureDate), 3000);
    measureDate.sendKeys('2020-11-24');

    let measurement = await driver.findElement(By.id('')); //has a name="BloodPressureMeasurement", awaiting ID
    await driver.wait(until.elementIsVisible(measurement), 3000);
    measureDate.sendKeys('10000???');

    //Locate and click "Bekräfta"-button
    let confirm = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(confirm), 3000);
    confirm.click();

    /*
    Här kan vi göra fler tester med ogiltiga datum etc för att se vad som händer. För att rensa ett textfält
    i Selenium ska man kunna skriva typ measureDate.clear(). 
    */

})