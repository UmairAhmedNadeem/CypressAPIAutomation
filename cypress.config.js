const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // This will specify the folder where your test files are located
    specPattern: 'cypress/e2e/**/*.js', // Update the pattern if necessary (e.g., **/*.spec.js for specific file types)

    setupNodeEvents(on, config) {
      // Implement any node event listeners if necessary
    },
  },
});
