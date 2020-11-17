const { By, until } = require('selenium-webdriver')

const waitUntilTime = 20000

async function querySelector(selector, driver) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(selector)),
    waitUntilTime
  )
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}

module.exports = {
  querySelector
}
