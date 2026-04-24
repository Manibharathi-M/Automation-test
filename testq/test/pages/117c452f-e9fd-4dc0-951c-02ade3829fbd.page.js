import * as selectors from '../fixtures/selectors.json';

/**
 * Logs in a user to the SecQ AI platform.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('login_url'));
  cy.get(selectors.LoginPage.username_input).type(email);
  cy.get(selectors.LoginPage.password_input).type(password);
  cy.get(selectors.LoginPage.submit_button).click();
});

/**
 * Navigates to the SecQ AI platform login page.
 */
Cypress.Commands.add('navigateToLoginPage', () => {
  cy.visit(Cypress.env('login_url'));
});