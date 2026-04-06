import * as selectors from "../../fixtures/selectors.json";

describe('User Logout Functionality', () => {
  it('should allow a user to log out successfully', () => {
    // Log in first to ensure the logout button is available
    cy.login('testuser', 'password'); // Replace with actual login credentials or use environment variables
    cy.url().should('include', '/home'); // Verify successful login

    // Perform the logout action using the custom command
    cy.logout();

    // Verify redirection to the login page after logout
    cy.url().should('include', '/login');
  });
});
