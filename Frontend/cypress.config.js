import { defineConfig } from "cypress";

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js, jsx, ts, tsx}',
    supportFile: 'cypress/support/e2e.js'
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
