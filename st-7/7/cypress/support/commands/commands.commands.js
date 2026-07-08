import * as selectors from '../fixtures/selectors.json';

// Direct selector helpers (single selector string only)
Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible').click({ force: true });
});

Cypress.Commands.add('typeText', (selector, text) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible').clear().type(text);
});

Cypress.Commands.add('assertVisible', (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('pressTabKey', () => {
  cy.focused().tab();
});

Cypress.Commands.add('assertFocusedElement', (selector) => {
  cy.focused().should('match', selector);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://secq.augustahitech.com/login');
  cy.get(selectors.LoginPage['Email ID input field']).type(email, { log: false });
  cy.get(selectors.LoginPage['Password input field']).type(password, { log: false });
  cy.get(selectors.LoginPage['Login button']).click();
});
