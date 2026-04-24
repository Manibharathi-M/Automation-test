import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Persistent Menubar', () => {
  beforeEach(() => {
    // Set environment variables for login credentials and URL
    Cypress.env('login_url', 'https://secq.augustahitech.com/login');
    Cypress.env('username', 'ahsales.v2@augustahitech.com');
    Cypress.env('password', 'Augusta@123#');

    // Intercept network calls that might be critical for loading the dashboard
    // This is a placeholder and might need adjustment based on actual network traffic
    cy.intercept('GET', 'https://secq.augustahitech.com/constants.json*', cy.spy().as('constantsApiCall')).as('constantsApi');
  });

  it('TC_3 - Verify that the persistent Menubar remains fixed and does not scroll with page content when scrolling up a long page.', () => {
    // Step 1: Navigate to the application's login page by entering the URL.
    // This is handled by the beforeEach block and cy.visit within the login command.
    // network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A07%3A56+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A07%3A56+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
// network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A08%3A52+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A08%3A52+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
cy.visit(Cypress.env('login_url'));
    cy.url().should('include', '/login');

    // Step 2: Enter valid username and password into the designated input fields.
    cy.get(selectors.LoginPage.usernameField).type(Cypress.env('username'));
    cy.get(selectors.LoginPage.passwordField).type(Cypress.env('password'));
    cy.get(selectors.LoginPage.usernameField).should('have.value', Cypress.env('username'));
    cy.get(selectors.LoginPage.passwordField).should('have.value', Cypress.env('password'));

    // Step 3: Click the 'Login' button to submit credentials.
    cy.get(selectors.LoginPage.submitButton).click();

    // Expected Result for Step 3: User is successfully authenticated and redirected to the main dashboard.
    cy.url().should('include', '/dashboard');
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible');
    cy.wait('@constantsApi'); // Wait for the intercepted API call to complete

    // Step 4: Observe the layout of the dashboard, specifically the left side.
    // Expected Result for Step 4: A persistent navigation menu (Menubar) is clearly visible on the left.
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible');
    cy.get(selectors.DashboardPage.navigationMenu).should('have.css', 'position', 'fixed'); // Asserting it's fixed

    // Step 5: Scroll down the dashboard page to reveal extensive content.
    // Step 6: Scroll up the dashboard page to return to the top.
    // Step 8: Repeat scrolling actions on the newly navigated page.
    // These steps are combined into a custom command for verification.
    cy.verifyPersistentMenubar();

    // Step 7: Click a link within the Menubar to navigate to another section.
    // Expected Result for Step 7: The Menubar remains visible and functional during and after navigation.
    cy.get(selectors.DashboardPage.menuItemUsers).click();
    cy.url().should('include', '/users');
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible'); // Menubar should still be visible
    cy.get(selectors.DashboardPage.navigationMenu).should('have.css', 'position', 'fixed'); // Asserting it's fixed after navigation
    cy.get(selectors.DashboardPage.pageContent).should('be.visible'); // Ensure content loaded

    // Step 9: Verify functionality of all interactive elements within the Menubar.
    // Expected Result for Step 9: All Menubar links and buttons are responsive and perform their intended actions.
    cy.get(selectors.DashboardPage.menuItemDashboard).click();
    cy.url().should('include', '/dashboard');
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible');

    cy.get(selectors.DashboardPage.menuItemReports).click();
    cy.url().should('include', '/reports');
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible');

    cy.get(selectors.DashboardPage.menuItemSettings).click();
    cy.url().should('include', '/settings');
    cy.get(selectors.DashboardPage.navigationMenu).should('be.visible');

    // Logout functionality check (assuming it's a button) as per selector
    cy.get(selectors.DashboardPage.menuItemLogout).click();
    cy.url().should('include', '/login'); // Assuming logout redirects to login page
  });
});

cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    });
cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    });
