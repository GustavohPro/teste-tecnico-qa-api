// Importar custom commands para testes
import './http';
import './validation';

// Comando para aguardar elemento com retry
Cypress.Commands.add('waitForElement', (selector, timeout = 5000) => {
    cy.get(selector, { timeout }).should('be.visible');
});
