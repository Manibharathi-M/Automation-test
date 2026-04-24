import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('login_url'));
  cy.get(selectors.LoginPage.emailIdInput).type(email);
  cy.get(selectors.LoginPage.passwordInput).type(password);
  cy.get(selectors.LoginPage.loginButton).click();
});

Cypress.Commands.add('verifyLogin', () => {
  cy.url().should('include', '/dashboard'); // Assuming dashboard is the post-login URL
});

Cypress.Commands.add('verifyNavigationMenu', () => {
  cy.get(selectors.DashboardPage.dashboardLink).should('be.visible');
  cy.get(selectors.DashboardPage.knowledgeBaseLink).should('be.visible');
  cy.get(selectors.DashboardPage.questionnairesLink).should('be.visible');
  cy.get(selectors.DashboardPage.systemTasksLink).should('be.visible');
  cy.get(selectors.DashboardPage.usageReportsLink).should('be.visible');
  cy.get(selectors.DashboardPage.faqSupportLink).should('be.visible');
});

Cypress.Commands.add('verifyNavigationMenuFixed', () => {
  // For verifying fixed navigation, we might need to scroll and check its position.
  // This is a basic check for visibility after scrolling.
  cy.get('body').then(($body) => {
    // Scroll down to ensure content is scrollable
    cy.scrollTo('bottom');
    cy.get(selectors.DashboardPage.dashboardLink).should('be.visible'); // Check visibility after scroll
    // Scroll up
    cy.scrollTo('top');
    cy.get(selectors.DashboardPage.dashboardLink).should('be.visible'); // Check visibility after scroll up
  });
});
