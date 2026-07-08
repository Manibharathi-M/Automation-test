// cypress/support/e2e.js
// Loaded automatically before every test file.

// Import all per-PBI custom commands via the commands index
import './commands/index';

// Suppress uncaught exception errors originating from the app under test
Cypress.on('uncaught:exception', () => false);
