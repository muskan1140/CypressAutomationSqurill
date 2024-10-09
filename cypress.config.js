const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 900,
  e2e: {
    baseUrl: "https://start.squirro.com/setup/app",
    setupNodeEvents(on, config) {
        allureWriter(on, config);
        return config;
      }
    }
  });
