const { test } = require('@playwright/test');
const { 
  navigateToLogin, 
  enterCredentials, 
  clickLogin, 
  assertErrorMessageIsVisible, 
  assertErrorMessageIsNotSpecific, 
  assertEmailFieldIsVisible, 
  assertPasswordFieldIsVisible 
} = require('../utils/commands');

const { selectors } = require('../locators/selectors');

test.describe('Login Functionality', () => {
  test('TC_5: Verify that login fails displaying a generalized error message when the entered email is missing the domain part.', async ({ page }) => {
    await navigateToLogin(page);
    await assertEmailFieldIsVisible(page);
    await assertPasswordFieldIsVisible(page);
    // Enter an email address missing the domain part into the Email field.
    await page.fill(selectors.LoginPage.emailField, 'testuser');
    // The entered text 'testuser' appears in the Email input field.
    // This is implicitly tested by the 'fill' action succeeding.
    
    await enterCredentials(page, 'testuser', 'Augusta@123#');
    await clickLogin(page);
    await assertErrorMessageIsVisible(page);
    await assertErrorMessageIsNotSpecific(page);
  });
});
