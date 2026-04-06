import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('LOGIN_URL'));
  cy.get(selectors.SecQAIPlatformLoginPage.EmailID).type(email);
  cy.get(selectors.SecQAIPlatformLoginPage.Password).type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('verifyPasswordMasking', () => {
  cy.get(selectors.SecQAIPlatformLoginPage.Password).invoke('attr', 'type').should('equal', 'password');
});

Cypress.Commands.add('verifyEmailFieldExists', () => {
  cy.get(selectors.SecQAIPlatformLoginPage.EmailID).should('be.visible');
});

Cypress.Commands.add('verifyPasswordFieldExists', () => {
  cy.get(selectors.SecQAIPlatformLoginPage.Password).should('be.visible');
});
