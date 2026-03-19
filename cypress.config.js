const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: null,
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.cy.js',
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'mochawesomeReports',
            reportFilename: 'report',
            overwrite: true,
            html: true,
            json: true,
            charts: true,
            reportPageTitle: 'Dog API Test Report',
        },
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    api: {
        baseUrl: 'https://dog.ceo/api',
    },
});
