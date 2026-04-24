import * as selectors from '../fixtures/selectors.json';

Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('login_url'));
  cy.get(selectors.LoginPage.emailIdInput).type(email);
  cy.get(selectors.LoginPage.passwordInput).type(password);
  cy.get(selectors.LoginPage.loginButton).click();
});

Cypress.Commands.add('verifyLightModeStyles', () => {
  // Verify background and text colors for general UI elements
  cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // Assuming white background for light theme
  cy.get('body').should('have.css', 'color', 'rgb(0, 0, 0)'); // Assuming black text for light theme

  // Verify buttons styling
  cy.get('button').each(($button) => {
    cy.wrap($button).should('have.css', 'background-color', 'rgb(255, 255, 255)'); // Example: light background for buttons
    cy.wrap($button).should('have.css', 'color', 'rgb(0, 0, 0)'); // Example: dark text for buttons
  });

  // Verify input fields styling
  cy.get('input[type="text"], input[type="password"], input[type="email"]').each(($input) => {
    cy.wrap($input).should('have.css', 'background-color', 'rgb(255, 255, 255)'); // Example: light background for inputs
    cy.wrap($input).should('have.css', 'border-color', 'rgb(200, 200, 200)'); // Example: subtle border color
  });

  // Verify navigation menu styling
  cy.get(selectors.DashboardPage.leftNavigationMenu).should('have.css', 'background-color', 'rgb(248, 249, 250)'); // Example: light grey background for sidebar
  cy.get(selectors.DashboardPage.leftNavigationMenu).find('a').each(($link) => {
    cy.wrap($link).should('have.css', 'color', 'rgb(33, 37, 41)'); // Example: dark text for nav links
  });

  // Verify heading and text styling
  cy.get('h1, h2, h3, p, label').each(($textElement) => {
    cy.wrap($textElement).should('have.css', 'color', 'rgb(33, 37, 41)'); // Example: dark text for headings and paragraphs
  });

  // Verify icons are discernible (this is a more complex visual check, often relying on contrast)
  // Example: checking for presence and visibility of icons in specific areas
  cy.get('.icon').should('be.visible');

  // Verify modal styling consistency
  cy.get('.modal').should('have.css', 'background-color', 'rgb(255, 255, 255)'); // Example: white background for modals
});
