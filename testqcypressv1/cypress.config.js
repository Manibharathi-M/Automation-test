const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // All test files under cypress/e2e/ (grouped by PBI ID)
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Support file loaded before every test file
    supportFile: 'cypress/support/e2e.js',

    // Fixtures: per-PBI selector JSON files
    fixturesFolder: 'cypress/fixtures',

    viewportWidth: 1280,
    viewportHeight: 720,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
