import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Login Interface Focus Transitions', () => {
  it('Verify that the login interface correctly handles focus transitions between Email and Password fields using the Tab key.', () => {
    // Navigate to the SecQ AI login page to initiate the test.
    cy.visit("https://secq.augustahitech.com/home");
    cy.url().should('include', '/home'); // Assertion for navigation

    // Click on the Email ID input field to set initial focus.
    cy.clickElement(selectors.LoginPage['Email ID input field']);
    cy.focused().should('have.attr', 'id', 'login_user_id'); // Assertion for initial focus

    // Press the 'Tab' key on the keyboard once.
    cy.pressTabKey();
    // The cursor moves and focuses on the Password input field.
    cy.assertFocusedElement(selectors.LoginPage['Password input field']); // Assertion for focus on password field

    // Press the 'Tab' key on the keyboard again.
    cy.pressTabKey();
    // The cursor moves and focuses on the 'Login' button.
    cy.assertFocusedElement(selectors.LoginPage['Login button']); // Assertion for focus on login button
  });
});
