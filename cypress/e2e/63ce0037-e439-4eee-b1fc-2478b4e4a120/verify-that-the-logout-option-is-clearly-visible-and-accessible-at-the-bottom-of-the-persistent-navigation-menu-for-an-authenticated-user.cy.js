import * as selectors from "../../fixtures/selectors.json";

describe('User Logout Functionality', () => {
  it('should allow a user to log out of the SecQ AI platform', () => {
    // Arrange: Login the user
    cy.visit(Cypress.env('LOGIN_URL'));
    cy.get(selectors.LoginPage.usernameInput).type(Cypress.env('USERNAME'));
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('PASSWORD'));
    cy.get(selectors.LoginPage.submitButton).click();
    cy.url().should('include', '/home');

    // Act: Initiate logout and confirm
    cy.logout();

    // Assert: Verify redirection to login page
    cy.url().should('include', '/login');
  });
});
