import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Login Interface Verification', () => {
  it('Verify that the login interface displays an Email ID input field and a 'Login' button.', () => {
    // Navigate to the SecQ AI platform login page using a web browser.
    cy.visit('https://secq.augustahitech.com/login');

    // Observe the login interface for the presence of an Email ID input field.
    cy.get(selectors.LoginPage['Email ID input field']).should('exist');
    cy.get(selectors.LoginPage['Email ID input field']).should('be.visible');

    // Observe the login interface for the presence of a 'Login' button.
    cy.get(selectors.LoginPage['Login button']).should('exist');
    cy.get(selectors.LoginPage['Login button']).should('be.visible');

    // Look for a password input field on the login interface.
    cy.get(selectors.LoginPage['Password input field']).should('exist');
    cy.get(selectors.LoginPage['Password input field']).should('be.visible');
  });
});
