const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.cross = '//*[@id="elementor-popup-modal-11619"]/div/a/i';
    this.loginClick = '//*[@id="masthead"]/div/section[1]/div/div[5]/div/div/div/div/a/i';
    this.usernameInput = '//*[@id="eael-user-login"]';
    this.passwordInput = '//*[@id="eael-user-password"]';
    this.loginButton = '//*[@id="eael-login-submit"]';
    this.validLoginValidation = '//*[@id="post-14"]/div/div/div[1]/div/div/h6';
    this.errorMessage = '//*[@id="error"]';
    // this.successMessage = "";
  }

  async login(username, password) {
    await this.page.locator(this.cross).click();
    await this.page.locator(this.loginClick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "rojendangol1"
    );
  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};