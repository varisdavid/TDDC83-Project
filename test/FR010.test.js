const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
jest.setTimeout(100000);
const { querySelector } = require('./helpers')
const rootURL = 'localhost:3000/patient/measurements'

beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build()
  })
  
  afterAll(async () => driver.quit())

it('initialises the context', async () => {
    await driver.get(rootURL)
})

it('should navigate from patient/measurements (Gunilla Andersson), and to their calendar', async () => {
    //Click on calendar tab
    let calendarTab = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(calendarTab), 5000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Clicking on date (Nov 16th)
    let date = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(date), 3000);
    date.click();
    await new Promise(r => setTimeout(r, 1500));
    
    //Click "Add Activity"-button
    let addActivity = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(addActivity),3000);
    await driver.findElement(By.id('')).click();
    await new Promise(r => setTimeout(r, 1500));

    //Fill in activity title and activity description
    let activityTitle = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(activityTitle),3000);
    let activityDesc = await driver.findElement(By.id(''));
    await driver.wait(until.elementIsVisible(activityDesc),3000);

    acitivityTitle.sendKeys('Blodprov');
    activityDesc.sendKeys('Kl 09.00');

    //Click save-button
    let save = await driver.findElement(By.id(''));
    save.click();
})