import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('login_url'));
  cy.get(selectors.LoginPage['Email ID input field']).type(email);
  cy.get(selectors.LoginPage['Password input field']).type(password, {
    log: false
  });
  cy.get(selectors.LoginPage['Login button']).click();
});

Cypress.Commands.add('navigateToDashboard', () => {
  cy.visit('/home');
  cy.url().should('include', '/home');
});
