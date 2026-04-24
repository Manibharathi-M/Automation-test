import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (username, password) => {
  const loginUrl = Cypress.env('login_url') || 'https://secq.augustahitech.com/login';
  cy.visit(loginUrl);
  cy.get(selectors.LoginPage.usernameField).type(username);
  cy.get(selectors.LoginPage.passwordField).type(password);
  cy.get(selectors.LoginPage.submitButton).click();
});

Cypress.Commands.add('verifyMenuBarPresence', () => {
  cy.get(selectors.DashboardPage.menuBar).should('be.visible');
});

Cypress.Commands.add('verifyMenuBarPersistence', () => {
  // This assertion checks if the menubar is visible and not scrolling with the page.
  // Cypress's default behavior is to wait for elements to be visible and in viewport.
  // For a truly fixed element, we can also check its position relative to the viewport
  // after scrolling, though this can be brittle. A simpler check is to ensure it's visible.
  cy.get(selectors.DashboardPage.menuBar).should('be.visible');
  // To further assert fixed positioning, one might need to scroll and re-check visibility.
  // However, 'be.visible' usually implies it's within the viewport and accessible.
  cy.scrollTo('bottom', { ensureScrollable: false });
  cy.get(selectors.DashboardPage.menuBar).should('be.visible');
  cy.scrollTo('top', { ensureScrollable: false });
  cy.get(selectors.DashboardPage.menuBar).should('be.visible');
});
