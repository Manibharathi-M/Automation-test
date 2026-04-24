import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    cy.visit(Cypress.env('login_url'));
    cy.get(selectors.LoginPage['Email ID input field']).type(Cypress.env('email'));
    cy.get(selectors.LoginPage['Password input field']).type(Cypress.env('password'), {
      log: false
    });
    cy.get(selectors.LoginPage['Login button']).click();
    cy.url().should('include', '/home');
    cy.get(selectors.LoginPage['Email ID input field']).type('test@example.com');
    cy.get(selectors.LoginPage['Email ID input field']).should('have.value', 'test@example.com');
    cy.get(selectors.LoginPage['Password input field']).type('password123');
    cy.get(selectors.LoginPage['Password input field']).should('have.attr', 'type', 'password');
    cy.get(selectors.DashboardPage['Navigation menu']).should('be.visible');
    cy.get(selectors.DashboardPage['Dashboard menu item']).should('be.visible');
    cy.get(selectors.DashboardPage['Knowledge Base menu item']).should('be.visible');
    cy.get(selectors.DashboardPage['Questionnaires menu item']).should('be.visible');
    cy.get(selectors.DashboardPage['System Tasks menu item']).should('be.visible');
    cy.get(selectors.DashboardPage['Usage Reports menu item']).should('be.visible');
    cy.get(selectors.DashboardPage['FAQ/Support menu item']).should('be.visible');
    cy.get('body').scrollTo('bottom');
    cy.get('body').scrollTo('top');
    cy.get(selectors.DashboardPage['FAQ/Support menu item']).click();
    cy.url().should('include', '/faq');
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.get('body').should('have.class', 'light-theme');
  });
});