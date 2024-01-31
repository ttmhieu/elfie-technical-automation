import checkElement from "webdriver-image-comparison";

class ElfiePage {
  constructor(client) {
    this.client = client;
    this.logo = 'img[alt="Elfie"]';
    this.hamburgerMenu = '[aria-label="Main menu"]';
    this.xButton = '[aria-label="Close"]';
    this.copyrightText = "=Copyright 2023 Elfie Pte. Ltd.";
  }

  async isLogoDisplayed() {
    const logo = await this.client.$(this.logo);
    return await logo.isDisplayed();
  }

  async clickHamburgerMenu() {
    await this.client.$(this.hamburgerMenu).click();
  }

  async isXButtonDisplayed() {
    const xButton = await this.client.$(this.xButton);
    return await xButton.isDisplayed();
  }

  async scrollDown() {
    await this.client.execute("mobile: scroll", { direction: "down" });
  }

  async isCopyrightTextDisplayed() {
    const copyrightText = await this.client.$(this.copyrightText);
    return await copyrightText.isDisplayed();
  }
  async captureScreenshot(fileName) {
    await browser.saveScreenshot(this.client, fileName);
  }

  async checkElementScreenshot(element, fileName) {
    await checkElement(this.client, element, fileName);
  }
}
export default ElfiePage;
