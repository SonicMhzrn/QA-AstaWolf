const { expect } = require("@playwright/test");
const { text } = require("stream/consumers");

let count = 0;
let cross = 1;
exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    
    this.cross = '//*[@id="elementor-popup-modal-11619"]/div/a/i';
    this.shop = '//*[@id="menu-item-7037"]/a';
    this.itemSelect = '//*[@id="content"]/div/div/section[1]/div/div[2]/div/div/div/div[1]/div[1]/section/div/div/div/div[1]/div/a/img';
    this.addButton = '//*[@id="content"]/div/div[2]/section[1]/div/div[2]/div/section[2]/div/div/div/div/div/div/form/div/button';
    this.basket = '//div[contains(@class,"xoo-cp-btns")]/a[1]';
    this.increase =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';
    this.remove = '//td[contains(@class,"xoo-cp-remove")]';
    // this.emptyCart = '//h2[contains(text(),"Your basket is currently empty")]';
    this.crossButton = '//div[contains(@class,"xoo-cp-container")]/span';
    this.searchBtn =
      '//*[@id="masthead"]/div/section[1]/div/div[3]/div/div/div/search/form/div[1]/i';
    this.searchItem =
      '//*[@id="elementor-search-form-082ac53"]';
    this.searchResult = '//div[contains(@class,"elementor-widget-container")]/h1/a';
  }

  async addToCart(message) {
    await this.page.locator(this.cross).click();
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.addButton).click();
    // await this.page.locator(this.increase).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.basket)).toHaveText(message);
  }

  async removeQuantity() {
    await this.page.locator(this.remove).click();
    // await expect(this.page.locator(this.emptyCart)).toHaveText(
    //   "Your basket is currently empty"
    // );
  }

  async addMultipleItem() {
    await this.page.locator(this.cross).click();
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
  
    for (let i = 0; i < 3; i++) {
      await this.page.locator(this.addButton).click();
      count++;
      // Ensure the cross button is clicked only when necessary
      if (count < 3) {
        await this.page.locator(this.crossButton).click();
      }
    }
  
    await this.page.waitForTimeout(3000);
  
    // Wait for the input element to be visible
    const inputElement = await this.page.locator('.xoo-cp-qtybox .xoo-cp-qty').first();
    await inputElement.waitFor({ state: 'visible' });
  
    // Retrieve the value of the input element
    const value = await inputElement.inputValue();
    console.log("Input Value:", value);
  
    // Validate the value
    if (parseInt(count) === parseInt(value)) {
      console.log("Test Successful!");
    } else {
      console.log("Test Failed!");
    }
  }
  

  async searchOperation(item) {
    await this.page.locator(this.cross).click();
    await this.page.locator(this.searchBtn).click();
    await this.page.locator(this.searchItem).fill(item);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.searchItem).press("Enter");
    await this.page.waitForTimeout(2000);

    const searchResultText = await this.page
      .locator(this.searchResult)
      .innerText();
    console.log("Search Result Text:", searchResultText);

    if (searchResultText.toLowerCase().includes(item.toLowerCase())) {
      console.log("Result found.");
    } else {
      console("Error!");
    }
  }
};