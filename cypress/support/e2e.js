// Importar todos os comandos customizados
import './commands';

// Configurações globais do Cypress
// Nota: Cypress.Cookies.defaults() foi removido na v12.0.0
// Use cy.session() em vez disso se precisar gerenciar sessões

// Hook antes de cada teste
beforeEach(() => {
    // Limpar dados de teste antes de cada caso
    cy.log('Iniciando novo teste');
});

// Hook após cada teste
afterEach(() => {
    // Ações pós-teste se necessário
    cy.log('Teste finalizado');
});

// Desabilitar logs desnecessários
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
        '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');

    app.document.head.appendChild(style);
}
