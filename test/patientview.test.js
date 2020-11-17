const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')
jest.setTimeout(100000);
const { querySelector } = require('./helpers')

const rootURL = 'localhost:3000/overview/patients'



beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build()
})

afterAll(async () => driver.quit())


it('initialises the context', async () => {
await driver.get(rootURL)
})

it('should try to access patient data but press cancel and still be at overview page FR054a', async () =>{
  let anchor = await querySelector('/html/body/div/div/div[3]/div/div/div[2]/div/div/table/div/tbody/tr[1]/td[3]/button', driver);
  await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div/div[2]/div/div/table/div/tbody/tr[1]/td[3]/button')).click();
  let el = await querySelector('/html/body/div[2]/div[3]/div/button[1]/span[1]', driver);
  await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/button[1]/span[1]')).click();
  let ej = await querySelector('/html/body/div/div/div[1]/header/div/div/div/a[1]/span[1]', driver);
  const actual = await driver.findElement(By.xpath('/html/body/div/div/div[1]/div/div[2]/a')).getText();
  const expected = 'Ryds vårdcentral'
  expect(actual).toEqual(expected)
})
it('should filter all different filters on the current patients in our database FR53', async () =>{
  let anchor = await querySelector('/html/body/div/div/div[3]/div/div/div[1]/div/div/div[2]/button[1]/span[1]', driver);
  const filter = '/html/body/div/div/div[3]/div/div/div[1]/div/div/div[2]/button[1]/span[1]';
  await driver.findElement(By.xpath(filter)).click();
  let e = await querySelector('/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div', driver);
  const gender = '/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div'
  
  const team = '/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div'
  const depart = '/html/body/div[2]/div[3]/div/div[2]/div[1]/div[3]/div'

  var clickArray = ['/html/body/div[3]/div[3]/ul/li[1]','/html/body/div[3]/div[3]/ul/li[2]', '/html/body/div[3]/div[3]/ul/li[3]']
  var teamArray = ['/html/body/div[3]/div[3]/ul/li[1]','/html/body/div[3]/div[3]/ul/li[2]', '/html/body/div[3]/div[3]/ul/li[3]']
  var departArray = ['/html/body/div[3]/div[3]/ul/li[1]','/html/body/div[3]/div[3]/ul/li[2]', '/html/body/div[3]/div[3]/ul/li[3]']
  var priorityArray = ['/html/body/div[2]/div[3]/div/div[2]/div[1]/fieldset/div/label[1]/span[1]/span[1]/input', '/html/body/div[2]/div[3]/div/div[2]/div[1]/fieldset/div/label[2]/span[1]/span[1]/input', 
'/html/body/div[2]/div[3]/div/div[2]/div[1]/fieldset/div/label[3]/span[1]/span[1]/input']
  await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/button/span[1]')).click();
  driver.navigate().refresh();
  var i, j, k, x
  
for (i = 0; i < clickArray.length; i++) {
    for (j = 0; j < teamArray.length; j++) {
    
      for (k = 0; k < departArray.length; k++){
        
          for (x = 0; x < priorityArray.length; x++) {
            await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div/div[1]/div/div/div[2]/button[1]/span[1]'));
            await driver.findElement(By.xpath(filter)).click();
            let z = await querySelector('/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div', driver);
            await new Promise(r => setTimeout(r, 200));
            await driver.findElement(By.xpath(gender)).click();
            await driver.findElement(By.xpath(clickArray[i])).click();
            await new Promise(r => setTimeout(r, 200));
            await driver.findElement(By.xpath(team)).click();
            
            await driver.findElement(By.xpath(teamArray[j])).click();
            await new Promise(r => setTimeout(r, 200));
            await driver.findElement(By.xpath(depart)).click();
            await driver.findElement(By.xpath(departArray[k])).click();
            await new Promise(r => setTimeout(r, 500));
            await driver.findElement(By.xpath(priorityArray[x])).click();
            await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/button/span[1]')).click();
            await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div/div[1]/div/div/div[2]/button[1]')).click();


        } 
      }
    } 
} 

})

it('should try to access patient data but press "bekräfta" and shall be sent to pagient page FR054b FR055', async () =>{

  let anchor = await querySelector('/html/body/div/div/div[3]/div/div/div[2]/div/div/table/div/tbody/tr[1]/td[3]/button', driver);
  const pNumber = await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div/div[2]/div/div/table/div/tbody/tr[1]/td[4]')).getText();
  await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div/div[2]/div/div/table/div/tbody/tr[1]/td[3]/button')).click();
  let el = await querySelector('/html/body/div[2]/div[3]/div/button[1]/span[1]', driver);
  await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/button[2]/span[1]')).click();
  const url = await driver.getCurrentUrl();
  expect(url).toContain(pNumber);

})

