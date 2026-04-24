import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    cy.navigateToLoginPage();
    cy.url().should('include', '/login');
    cy.get(selectors.LoginPage.username_input).should('be.visible');
    cy.get(selectors.LoginPage.password_input).should('be.visible');
    cy.get(selectors.LoginPage.submit_button).should('be.visible').and('be.enabled');
    cy.get(selectors.LoginPage.submit_button).should('contain', 'Login').and('be.visible');
    cy.get(selectors.LoginPage.username_input).type(Cypress.env('username'));
    cy.get(selectors.LoginPage.password_input).type(Cypress.env('password'));
    cy.get(selectors.LoginPage.submit_button).click();
    cy.url().should('include', '/home');
    cy.get(selectors.LoginPage.username_input).should('have.value', Cypress.env('username'));
    cy.get(selectors.LoginPage.password_input).should('have.value', Cypress.env('password'));
    cy.get(selectors.LoginPage.password_input).should('have.attr', 'type', 'password');
  });
});