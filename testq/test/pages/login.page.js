const { $ } = require('@wdio/globals');
const locators = require('../locators/login.locators'); // Assuming a common locators file for login

class LoginPage {
  async open() {
    await browser.url('https://secq.augustahitech.com/login');
  }

  async login(email, password) {
    await $(locators.loginPage.emailField).setValue(email);
    await $(locators.loginPage.passwordField).setValue(password);
    await $(locators.loginPage.loginButton).click();
  }

  async isLoginButtonDisplayed() {
    return $(locators.loginPage.loginButton).isDisplayed();
  }

  async isLoginButtonClickable() {
    return $(locators.loginPage.loginButton).isClickable();
  }
}

module.exports = new LoginPage();
