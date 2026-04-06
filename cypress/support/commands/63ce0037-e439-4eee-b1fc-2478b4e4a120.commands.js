import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (username, password) => {
  cy.visit(Cypress.env('LOGIN_URL'));
  cy.get(selectors.LoginPage.usernameInput).type(username);
  cy.get(selectors.LoginPage.passwordInput).type(password);
  cy.get(selectors.LoginPage.submitButton).click();
  cy.url().should('include', '/home');
});

Cypress.Commands.add('logout', () => {
  // Scroll to the bottom of the persistent navigation menu to ensure the logout button is visible
  cy.get(selectors.Home.navigationMenu).scrollTo('bottom', {
    ensureScrollable: false
  });
  // Click on the 'Logout' option
  cy.get(selectors.Home.logoutButton).click();
  // Verify confirmation modal
  cy.get(selectors.LogoutConfirmation.confirmationModalTitle).should('be.visible').and('contain', 'Are you sure you want to log out?');
  // Confirm logout
  cy.get(selectors.LogoutConfirmation.confirmLogoutButton).click();
  // Verify redirection to login page
  cy.url().should('include', '/login');
});
