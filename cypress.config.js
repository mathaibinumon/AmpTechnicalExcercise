const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  //  specPattern: 'cypress/e2e/uitests/*.js'
  specPattern: 'cypress/e2e/*.js',
  projectId: "9k9arf"
  },
});
