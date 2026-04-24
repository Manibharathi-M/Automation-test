import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Theme Switching and Persistence', () => {
  // It's assumed that 'login_credentials' are set in cypress.env.json or similar
  // for the test environment to use.
  const { username, password, login_url } = Cypress.env('login_credentials');
  const THEME_STORAGE_KEY = 'themePreference'; // Key for localStorage persistence

  beforeEach(() => {
    // Ensure login credentials and URL are available.
    // If not set, this test might fail. Consider setting them in cypress.env.json.
    if (!username || !password || !login_url) {
      throw new Error("Login credentials or URL not set in Cypress environment variables.");
    }

    // Clean up theme preference from localStorage before each test to ensure isolation
    cy.clearLocalStorage();
    // Also, ensure the application is at a known state before login
    // network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A52%3A00+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A52%3A00+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
// network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A52%3A50+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+11%3A52%3A50+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
cy.visit(login_url);
  });

  it('TC_38 - Verify theme switching control is present, theme can be switched, and preference persists after re-login', () => {
    // Step 1: Launch the application and navigate to the login screen (handled in beforeEach).
    cy.url().should('include', '/login');

    // Step 2: Log in to the application with valid user credentials.
    cy.login(username, password);
    cy.url().should('include', '/home'); // Assuming successful login redirects to '/home'

    // Step 3: Locate and observe the application's Menubar.
    cy.get(selectors.DashboardPage.menubar).should('be.visible');

    // Step 4: Examine the Menubar for a theme switching control.
    cy.get(selectors.DashboardPage.themeToggle).should('be.visible');

    // Step 5: Interact with the theme switching control to change the theme.
    // First click: assume it changes from default (e.g., Light) to Dark.
    cy.changeTheme();

    // Step 6: Verify that the theme change is visually apparent (e.g., by checking a body class).
    // This assertion assumes the theme is applied via a class on the 'body' tag.
    // Adjust 'dark-theme' to the actual class name used by your application.
    cy.get('body').should('have.class', 'dark-theme');

    // Step 7: Log out of the application.
    // This simulates closing the session.
    // Assuming a logout button that is accessible after login.
    cy.get('button').contains('Logout').click();
    cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    });
cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    }); // Adjust selector if needed.
    cy.url().should('include', '/login');

    // Step 8: Relaunch the application and log in with the same user credentials.
    // This simulates a new session starting.
    cy.login(username, password);
    cy.url().should('include', '/home'); // Verify successful login to dashboard

    // Step 9: Verify the theme displayed on the application dashboard matches the last selection (Dark).
    // This confirms persistence. The 'dark-theme' class should still be present on the body.
    cy.get('body').should('have.class', 'dark-theme');

    // Optional: Switch back to Light theme and verify persistence again
    cy.changeTheme();
    cy.get('body').should('not.have.class', 'dark-theme'); // Assuming default is Light
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
    cy.login(username, password);
    cy.url().should('include', '/home');
    cy.get('body').should('not.have.class', 'dark-theme'); // Verify it remained Light
  });
});
