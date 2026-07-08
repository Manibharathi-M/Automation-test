import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('login_url'));
  cy.get(selectors.LoginPage.emailIdInput).type(email);
  cy.get(selectors.LoginPage.passwordInput).type(password);
  cy.get(selectors.LoginPage.loginButton).click();
});