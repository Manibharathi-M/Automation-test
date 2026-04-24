import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('User Login Functionality', () => {
  const loginUrl = 'https://secq.augustahitech.com/login';

  it('should allow a user to log in with valid credentials and redirect to the dashboard', () => {
    cy.visit(loginUrl);
    cy.get(selectors.LoginPage.emailIdInput).type('valid_user@example.com');
    cy.get(selectors.LoginPage.passwordInput).type('ValidP@ssword123');
    cy.get(selectors.LoginPage.loginButton).click();

    // Assuming the dashboard URL contains '/dashboard' upon successful login
    cy.url().should('include', '/dashboard');
  });

  it('should display an error message for invalid credentials', () => {
    cy.visit(loginUrl);
    cy.get(selectors.LoginPage.emailIdInput).type('invalid_user@example.com');
    cy.get(selectors.LoginPage.passwordInput).type('wrongpassword');
    cy.get(selectors.LoginPage.loginButton).click();

    cy.get(selectors.LoginPage.errorMessage).should('be.visible').and('contain', 'Invalid credentials');
  });

  it('should validate email format', () => {
    cy.visit(loginUrl);
    cy.get(selectors.LoginPage.emailIdInput).type('invalid-email-format');
    cy.get(selectors.LoginPage.passwordInput).type('ValidP@ssword123');
    cy.get(selectors.LoginPage.loginButton).click();

    // Depending on how the frontend handles email validation, this assertion might need adjustment.
    // This assumes the form doesn't submit or shows an inline error. If it submits and shows a general error, the above test covers it.
    // For a more specific email validation test, you might need to inspect DOM for specific error messages or use a different approach.
    cy.url().should('include', '/login'); // Stays on login page if email is invalid
  });

  it('should mask the password input', () => {
    cy.visit(loginUrl);
    const password = 'MySecretPassword1!';
    cy.get(selectors.LoginPage.passwordInput).type(password);

    // Check if the input type is password (usually 'password') or if it's masked.
    // This is a basic check, as true masking is a browser rendering feature.
    cy.get(selectors.LoginPage.passwordInput).should('have.attr', 'type', 'password');
  });

  // Note: Testing password complexity directly in frontend can be brittle.
  // It's often better tested on the backend or through integration tests.
  // This example assumes basic client-side validation might be present.
  it('should enforce password complexity (basic check)', () => {
    cy.visit(loginUrl);
    cy.get(selectors.LoginPage.emailIdInput).type('user@example.com');

    // Test with a weak password
    cy.get(selectors.LoginPage.passwordInput).type('short');
    cy.get(selectors.LoginPage.loginButton).click();
    // Expect to remain on the login page or see a specific error if client-side validation is strict
    cy.url().should('include', '/login');

    // Test with a strong password
    cy.get(selectors.LoginPage.passwordInput).clear().type('StrongP@ssw0rd');
    cy.get(selectors.LoginPage.loginButton).click();
    // Expect to be redirected if the strong password passes validation
    cy.url().should('include', '/dashboard');
  });
});
