const { expect } = require('@playwright/test');

async function navigateToLogin(page) {
  await page.goto('/login');
}

async function enterCredentials(page, email, password) {
  await page.fill(selectors.LoginPage.emailField, email);
  await page.fill(selectors.LoginPage.passwordField, password);
}

async function clickLogin(page) {
  await page.click(selectors.LoginPage.loginButton);
}

async function assertLoginButtonIsVisible(page) {
  await expect(page.locator(selectors.LoginPage.loginButton)).toBeVisible();
}

async function assertLoginButtonIsEnabled(page) {
  await expect(page.locator(selectors.LoginPage.loginButton)).toBeEnabled();
}

async function assertEmailFieldIsVisible(page) {
  await expect(page.locator(selectors.LoginPage.emailField)).toBeVisible();
}

async function assertPasswordFieldIsVisible(page) {
  await expect(page.locator(selectors.LoginPage.passwordField)).toBeVisible();
}

async function assertDashboardIsVisible(page) {
  await expect(page).toHaveURL(/home/);
}

async function assertErrorMessageIsVisible(page) {
    // Assuming a generic error message element, adjust selector if known
    await expect(page.locator('div[role="alert"]')).toBeVisible();
}

async function assertErrorMessageIsNotSpecific(page) {
    const errorMessage = await page.locator('div[role="alert"]').textContent();
    // This is a fallback assertion. A more robust test would check for specific non-specific messages.
    expect(errorMessage).not.toContain('email format');
    expect(errorMessage).not.toContain('domain part');
}

module.exports = {
  navigateToLogin,
  enterCredentials,
  clickLogin,
  assertLoginButtonIsVisible,
  assertLoginButtonIsEnabled,
  assertEmailFieldIsVisible,
  assertPasswordFieldIsVisible,
  assertDashboardIsVisible,
  assertErrorMessageIsVisible,
  assertErrorMessageIsNotSpecific
};
