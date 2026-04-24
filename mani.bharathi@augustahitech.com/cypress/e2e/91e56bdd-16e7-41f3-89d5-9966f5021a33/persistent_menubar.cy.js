import * as selectors from "../../fixtures/selectors.json";

// Stability fallback: surface meaningful errors during flaky UI transitions
Cypress.on('fail', (error) => {
  cy.log(`Automation failure: ${error.message}`);
  throw error;
});
describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    // network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+12%3A15%3A10+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+12%3A15%3A10+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
// network call captured: GET https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+12%3A16%3A03+GMT+0530+%28India+Standard+Time%29
cy.intercept('GET','https://secq.augustahitech.com/constants.json?data=Mon+Apr+20+2026+12%3A16%3A03+GMT+0530+%28India+Standard+Time%29').as('get_constants_json');
cy.visit(loginUrl);
    cy.url().should('include', '/login');
    cy.get(selectors.LoginPage.usernameField).type(username);
    cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    });
cy.wait('@get_constants_json', { timeout: 20000 }).then((interception) => {
      expect(interception?.response?.statusCode).to.be.oneOf([200, 201, 202, 204, 304]);
    });
    cy.get(selectors.LoginPage.passwordField).type(password);
    cy.get(selectors.LoginPage.usernameField).should('have.value', username);
    cy.get(selectors.LoginPage.passwordField).should('have.value', password);
    cy.get(selectors.LoginPage.submitButton).click();
    cy.url().should('include', '/home');
    cy.verifyMenuBarPresence();
    cy.get(selectors.DashboardPage.menuBar).find('a').first().click();
    cy.url().should('not.include', '/home');
    cy.verifyMenuBarPersistence();
    cy.scrollTo('bottom', { ensureScrollable: false });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(selectors.DashboardPage.menuBar).contains('Reports').click();
    cy.url().should('include', '/reports');
    cy.get('button[aria-label="Logout"]').click();
    cy.get(selectors.DashboardPage.menuBar).should('not.exist');
  });
});