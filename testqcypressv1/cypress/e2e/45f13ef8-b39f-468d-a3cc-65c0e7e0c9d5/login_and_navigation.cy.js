import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    cy.visit(Cypress.env('login_url'));
    cy.get(selectors.LoginPage.emailIdInput).should('be.visible').and('have.attr', 'placeholder', 'Email ID');
    cy.get(selectors.LoginPage.passwordInput).should('be.visible').and('have.attr', 'placeholder', 'Password');
    cy.get(selectors.LoginPage.loginButton).should('be.visible').and('contain', 'Login');
    cy.get(selectors.LoginPage.emailIdInput).type(Cypress.env('username')).should('have.value', Cypress.env('username'));
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('password')).should('have.value', Cypress.env('password'));
    cy.get(selectors.LoginPage.loginButton).click();
    cy.url().should('include', '/dashboard');
    cy.get(selectors.LoginPage.emailIdInput).type(Cypress.env('username'));
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('password'));
    cy.get(selectors.LoginPage.passwordInput).should('have.attr', 'type', 'password');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.verifyLogin();
    cy.get('nav.sidebar').should('be.visible');
    cy.verifyNavigationMenu();
    cy.verifyNavigationMenuFixed();
  });
});