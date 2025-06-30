const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  preserve: ["cookies", "localStorage"],
  // video: true,
  defaultCommandTimeout: 15000,
  responseTimeout: 15000,
  pageLoadTimeout: 30000,
  requestTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {

      // @ts-ignore
      require('cypress-mochawesome-reporter/plugin')(on);
      this.screenshotOnRunFailure=true;
    },
  },
});

