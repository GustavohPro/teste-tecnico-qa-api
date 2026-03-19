// Comandos para validações

Cypress.Commands.add('validateResponseSchema', (response, schemaName) => {
    // Este comando será usado com schemas AJV para validar respostas
    cy.wrap(response).then((resp) => {
        cy.log_info(`Validando schema: ${schemaName}`);
        // A validação será feita no teste específico com o schema
    });
});

Cypress.Commands.add('expectStatusCode', (expectedStatus) => {
    return (response) => {
        expect(response.status).to.eq(expectedStatus);
        return response;
    };
});

Cypress.Commands.add('expectTextContent', (selector, expectedText) => {
    cy.get(selector).should('have.text', expectedText);
});

Cypress.Commands.add('expectContainText', (selector, expectedText) => {
    cy.get(selector).should('contain', expectedText);
});

Cypress.Commands.add('validateJsonResponse', (response, expectedKeys) => {
    expect(response.body).to.be.an('object');
    expectedKeys.forEach((key) => {
        expect(response.body).to.have.property(key);
    });
});
