const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
const { querySelector } = require('./helpers')
jest.setTimeout(30000);
const rootURL = 'localhost:3000'



beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build()
})

afterAll(async () => driver.quit())


it('initialises the context', async () => {
await driver.get(rootURL)
})
it('should click on navbar button to display a drawer', async () => {

  //vänta in att sidan laddas, sedan klicka på log-in
  let el = await driver.findElement(By.xpath('/html/body/div/div/div[1]/nav/div/div[3]/button'));
  await driver.wait(until.elementIsVisible(el),3000);
  
  await driver.findElement(By.xpath('/html/body/div/div/div[1]/nav/div/div[3]/button')).click();
  await new Promise(r => setTimeout(r, 1500));
  let pass = await driver.findElement(By.xpath('//*[@id="1-email"]'));
  await driver.wait(until.elementIsVisible(pass),3000);

  //skickar in Email och lösenord
  await driver.findElement(By.xpath('//*[@id="1-email"]')).sendKeys('test@test.se');
  await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div/div/div/div[2]/div[2]/span/div/div/div/div/div/div/div/div/div[2]/div[3]/div[2]/div/div/input')).sendKeys('Testtest1!');
  await driver.findElement(By.xpath('/html/body/div/div/div[2]/form/div/div/div/button')).click();
  await new Promise(r => setTimeout(r, 3500));
  let ej = await driver.findElement(By.xpath('/html/body/div/div/div[1]/nav/div/div[2]/a[1]'));
  await driver.wait(until.elementIsVisible(ej),100);
  
  const actual = await driver.findElement(By.xpath('/html/body/div/div/div[1]/nav/div/div[2]/a[1]')).getText();
  const expected = 'Home'
  expect(actual).toEqual(expected)
})


