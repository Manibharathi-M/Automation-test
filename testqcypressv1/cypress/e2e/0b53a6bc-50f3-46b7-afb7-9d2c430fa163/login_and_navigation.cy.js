import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    cy.visit(Cypress.env('login_url'));
    cy.get(selectors.LoginPage.emailIdInput).should('be.visible').type(Cypress.env('email'));
    cy.get(selectors.LoginPage.passwordInput).should('be.visible');
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('password')).should('have.value', Cypress.env('password'));
    cy.get(selectors.LoginPage.passwordInput).should('have.attr', 'type', 'password');
    cy.get(selectors.LoginPage.loginButton).click();
    cy.url().should('include', '/home');
    cy.login(Cypress.env('email'), Cypress.env('password'));
    cy.get(selectors.DashboardPage.leftNavigationMenu).should('be.visible');
    cy.get(selectors.DashboardPage.dashboardLink).should('be.visible');
    cy.get(selectors.DashboardPage.knowledgeBaseLink).should('be.visible');
    cy.get(selectors.DashboardPage.questionnairesLink).should('be.visible');
    cy.get(selectors.DashboardPage.systemTasksLink).should('be.visible');
    cy.get(selectors.DashboardPage.usageReportsLink).should('be.visible');
    cy.get(selectors.DashboardPage.faqSupportLink).should('be.visible');
    cy.get(selectors.DashboardPage.mainContentArea).scrollTo('bottom');
    cy.get(selectors.DashboardPage.dashboardLink).click();
    cy.get(selectors.DashboardPage.knowledgeBaseLink).click();
    cy.get(selectors.DashboardPage.questionnairesLink).click();
    cy.get(selectors.DashboardPage.mainContentArea).scrollTo('top');
    cy.get(selectors.DashboardPage.faqSupportLink).click();
    cy.url().should('include', '/faq');
    cy.get('body').should('be.visible');
    cy.verifyLightModeStyles();
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('password'));
  });
});