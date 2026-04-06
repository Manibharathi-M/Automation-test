import * as selectors from "../../fixtures/selectors.json";

describe('User Logout Functionality', () => {
  it('TC_53 - Verify that the 'Logout' option is visually distinct and easily identifiable within the persistent navigation menu.', () => {
    // Step 1: Navigate to the SecQ AI platform and log in with valid credentials.
    cy.login(Cypress.env('TEST_USERNAME'), Cypress.env('TEST_PASSWORD'));

    // Step 2: Locate the persistent navigation menu on the left side of the screen.
    cy.get(selectors.Home.navigationMenu).should('be.visible');

    // Step 3: Observe the 'Logout' option located at the bottom of the navigation menu.
    // Step 4: Examine the visual style and placement of the 'Logout' button.
    // Combined assertion for visual distinctness and presence at the bottom.
    cy.get(selectors.Home.navigationMenu).scrollTo('bottom', {
      ensureScrollable: false
    });
    cy.get(selectors.Home.logoutButton)
      .should('be.visible')
      .and('exist')
      .and('not.have.class', 'disabled') // Assuming 'disabled' class would make it less distinct.
      .should('have.css', 'color', 'rgb(255, 255, 255)') // Example assertion for distinct color, adjust as needed.
      .and('have.css', 'background-color', 'rgb(220, 53, 69)'); // Example assertion for distinct background, adjust as needed.

    // Step 5: Click on the distinct 'Logout' option within the navigation menu.
    cy.get(selectors.Home.logoutButton).click();

    // Step 7: Verify that the user is redirected to the SecQ AI login page.
    // This assertion is placed after the logout confirmation to ensure the full flow completes.

    // Step 6: Confirm the logout action by clicking the confirmation button in the modal.
    cy.get(selectors.LogoutConfirmation.confirmLogoutButton).click();

    // Verify confirmation modal is no longer visible and user is logged out.
    cy.get(selectors.LogoutConfirmation.confirmationModalTitle).should('not.be.visible');
    cy.url().should('include', '/login');

    // Step 7 (Re-verified after logout confirmation):
    cy.get(selectors.LoginPage.usernameInput).should('be.visible');
    cy.get(selectors.LoginPage.passwordInput).should('be.visible');
    cy.get(selectors.LoginPage.submitButton).should('be.visible');
  });
});
