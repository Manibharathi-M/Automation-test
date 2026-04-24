const { expect } = require('@wdio/globals');
const LoginPage = require('../../pages/login.page');
const locators = require('../../locators/TC_2.locators');

describe('TC_2: Verify the presence of a functional 'Login' button on the login interface for initiating the authentication process.', () => {
  it('should have a functional login button', async () => {
    // Step 1: Navigate to the SecQ AI platform login page.
    await browser.url('https://secq.augustahitech.com/login');
    await expect(browser).toHaveUrlContaining('/login');
    await expect($(locators.loginPage.emailField)).toBeDisplayed();
    await expect($(locators.loginPage.passwordField)).toBeDisplayed();

    // Step 2: Locate and identify the 'Login' button on the login page.
    const loginButton = $(locators.loginPage.loginButton);
    await expect(loginButton).toBeDisplayed();
    await expect(loginButton).toBeClickable(); // 'Login' button is visible and interactive.

    // Step 3: Attempt to click the 'Login' button without entering any credentials.
    await loginButton.click();
    // The 'Login' button is clickable and responds to user interaction.
    // NOTE: The expected result here is about the button's interactivity, not the subsequent validation/error message which is out of scope for this specific step's expected outcome.
    await expect(browser).toHaveUrlContaining('/login'); // Should remain on login page if no credentials are provided.

    // Step 4: Enter a valid email address and a password meeting complexity requirements.
    await $(locators.loginPage.emailField).setValue(global.login.email);
    await $(locators.loginPage.passwordField).setValue(global.login.password);
    await expect($(locators.loginPage.emailField)).toHaveValue(global.login.email);
    await expect($(locators.loginPage.passwordField)).toHaveValue(global.login.password);

    // Step 5: Click the 'Login' button after entering valid credentials.
    await loginButton.click();
    // User is successfully authenticated and redirected to the Dashboard.
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes('/home');
      },
      { timeout: 15000, timeoutMsg: 'Expected to be redirected to dashboard within 15 seconds' }
    );
    await expect(browser).toHaveUrlContaining('/home');
  });
});
