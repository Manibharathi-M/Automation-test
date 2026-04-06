import * as selectors from "../../fixtures/selectors.json";

describe('Generated Automation Flow', () => {
  it('executes all requested steps', () => {
    cy.visit(Cypress.env('LOGIN_URL'));
    cy.url().should('include', '/login');
    cy.verifyEmailFieldExists();
    cy.verifyPasswordFieldExists();
    cy.verifyPasswordMasking();
    cy.login(Cypress.env('VALID_EMAIL'), Cypress.env('VALID_PASSWORD'));
    cy.url().should('include', '/dashboard');
    cy.login('invalid_email@example.com', 'invalid_password');
    cy.get(selectors.SecQAIPlatformLoginPage.ErrorMessage).should('be.visible').and('contain', 'Invalid credentials');
  });
});