import * as selectors from '../../fixtures/selectors.json';

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('SecQ AI Platform Login', () => {
  it('Verify that a user can successfully log in to the SecQ AI platform using a valid email address and a complex password.', () => {
    // Step 1: Navigate to the SecQ AI platform login page.
    cy.visit(Cypress.env('login_url'));
    cy.get(selectors.LoginPage.emailIdInput).should('be.visible');
    cy.get(selectors.LoginPage.passwordInput).should('be.visible');

    // Step 2: Enter a valid email address (e.g., 'user@example.com') into the Email ID input field.
    // Use Cypress.env for sensitive data to avoid hardcoding.
    cy.get(selectors.LoginPage.emailIdInput).type(Cypress.env('email'));
    cy.get(selectors.LoginPage.emailIdInput).should('have.value', Cypress.env('email'));

    // Step 3: Enter a complex password (e.g., 'P@sswOrd1') into the Password input field.
    // Use Cypress.env for sensitive data to avoid hardcoding.
    cy.get(selectors.LoginPage.passwordInput).type(Cypress.env('password'));
    cy.get(selectors.LoginPage.passwordInput).should('have.value', Cypress.env('password')); // Note: Password fields are typically masked, but for testing purposes, we assert the value if the mask isn't directly verifiable through DOM attribute.

    // Step 4: Click the 'Login' button to submit credentials for authentication.
    cy.get(selectors.LoginPage.loginButton).click();

    // Expected Result: User is successfully authenticated and redirected to the SecQ AI platform's dashboard.
    // We can assert the URL or check for an element that is unique to the dashboard.
    cy.url().should('include', '/home'); // Adjust '/home' if the actual dashboard URL differs.
  });
});