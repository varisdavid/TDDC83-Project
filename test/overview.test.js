const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
const { querySelector } = require('./helpers')

const rootURL = 'localhost:3000/overview'



beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build()
})

afterAll(async () => driver.quit())


it('initialises the context', async () => {
await driver.get(rootURL)
})
it('should click on navbar button to display a drawer', async () => {
  let el = await driver.findElement(By.xpath('/html/body/div/div/div[1]/div/div[2]/a'));
  await driver.wait(until.elementIsVisible(el),3000);
  
  await driver.findElement(By.xpath('//*[@id="nav-tab-1"]')).click();
  
  
  let ej = await driver.findElement(By.xpath('/html/body/div/div/div[1]/div/div[2]/a'));
  await driver.wait(until.elementIsVisible(ej),100);
  
  const actual = await driver.findElement(By.xpath('/html/body/div/div/div[1]/div/div[2]/a')).getText();
  const expected = 'Ryds vårdcentral'
  expect(actual).toEqual(expected)
})