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


it('should navigate from patient/overview, to patient/measurements, click a measurement value and system should display graph and measurement list', async () => {
    //Navigate from Patient/Overview
    let measurementTab = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(measurementTab), 3000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Locate and click on a measurement value
    let measurementVal = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(measurementVal), 3000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Locate the bigger graph and list of measurements
    let measurementGraph = await driver.findElement(By.id(''));
    let measurementList = await driver.findElement(By.id(''));
})