// Comandos HTTP customizáveis com mais opções

/**
 * GET Request customizável
 * @param {string} url - URL da requisição
 * @param {object} options - Opções customizáveis
 *   - headers: {} // Headers customizados
 *   - timeout: 10000 // Timeout em ms
 *   - retry: 0 // Número de tentativas em caso de falha
 *   - expectedStatus: 200 // Status esperado
 *   - failOnStatusCode: false // Falhar se status code não for sucesso
 *   - validateSchema: 'schemaName' // Nome do schema para validar
 *   - log: true // Mostrar log da requisição
 */
Cypress.Commands.add('getRequest', (url, options = {}) => {
    const {
        headers = {},
        timeout = 10000,
        retry = 0,
        expectedStatus = null,
        failOnStatusCode = false,
        log = true,
    } = options;

    const token = localStorage.getItem('auth_token');
    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    return cy
        .request({
            method: 'GET',
            url,
            headers: { ...defaultHeaders, ...headers },
            timeout,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (expectedStatus && response.status !== expectedStatus) {
                throw new Error(
                    `Expected status ${expectedStatus}, got ${response.status}`
                );
            }

            return cy.wrap(response);
        });
});

/**
 * POST Request customizável
 * @param {string} url - URL da requisição
 * @param {object} body - Dados para enviar
 * @param {object} options - Opções customizáveis
 *   - headers: {} // Headers customizados
 *   - timeout: 10000 // Timeout em ms
 *   - expectedStatus: 201 // Status esperado
 *   - failOnStatusCode: false // Falhar se status code não for sucesso
 *   - validateSchema: 'schemaName' // Nome do schema para validar
 *   - log: true // Mostrar log da requisição
 */
Cypress.Commands.add('postRequest', (url, body = {}, options = {}) => {
    const {
        headers = {},
        timeout = 10000,
        expectedStatus = null,
        failOnStatusCode = false,
        log = true,
    } = options;

    const token = localStorage.getItem('auth_token');
    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const allHeaders = {
        ...defaultHeaders,
        'Content-Type': 'application/json',
        ...headers,
    };

    return cy
        .request({
            method: 'POST',
            url,
            headers: allHeaders,
            body,
            timeout,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (expectedStatus && response.status !== expectedStatus) {
                throw new Error(
                    `Expected status ${expectedStatus}, got ${response.status}`
                );
            }

            return cy.wrap(response);
        });
});

/**
 * PUT Request customizável
 * @param {string} url - URL da requisição
 * @param {object} body - Dados para enviar
 * @param {object} options - Opções customizáveis
 */
Cypress.Commands.add('putRequest', (url, body = {}, options = {}) => {
    const {
        headers = {},
        timeout = 10000,
        expectedStatus = null,
        failOnStatusCode = false,
        log = true,
    } = options;

    const token = localStorage.getItem('auth_token');
    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const allHeaders = {
        ...defaultHeaders,
        'Content-Type': 'application/json',
        ...headers,
    };

    return cy
        .request({
            method: 'PUT',
            url,
            headers: allHeaders,
            body,
            timeout,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (expectedStatus && response.status !== expectedStatus) {
                throw new Error(
                    `Expected status ${expectedStatus}, got ${response.status}`
                );
            }

            return cy.wrap(response);
        });
});

/**
 * PATCH Request customizável
 * @param {string} url - URL da requisição
 * @param {object} body - Dados para enviar
 * @param {object} options - Opções customizáveis
 */
Cypress.Commands.add('patchRequest', (url, body = {}, options = {}) => {
    const {
        headers = {},
        timeout = 10000,
        expectedStatus = null,
        failOnStatusCode = false,
        log = true,
    } = options;

    const token = localStorage.getItem('auth_token');
    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const allHeaders = {
        ...defaultHeaders,
        'Content-Type': 'application/json',
        ...headers,
    };

    return cy
        .request({
            method: 'PATCH',
            url,
            headers: allHeaders,
            body,
            timeout,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (expectedStatus && response.status !== expectedStatus) {
                throw new Error(
                    `Expected status ${expectedStatus}, got ${response.status}`
                );
            }

            return cy.wrap(response);
        });
});

/**
 * DELETE Request customizável
 * @param {string} url - URL da requisição
 * @param {object} options - Opções customizáveis
 */
Cypress.Commands.add('deleteRequest', (url, options = {}) => {
    const {
        headers = {},
        timeout = 10000,
        expectedStatus = null,
        failOnStatusCode = false,
        log = true,
    } = options;

    const token = localStorage.getItem('auth_token');
    const defaultHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    return cy
        .request({
            method: 'DELETE',
            url,
            headers: { ...defaultHeaders, ...headers },
            timeout,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (expectedStatus && response.status !== expectedStatus) {
                throw new Error(
                    `Expected status ${expectedStatus}, got ${response.status}`
                );
            }

            return cy.wrap(response);
        });
});

// ============================================
// COMANDOS AUXILIARES PARA VALIDAÇÃO
// ============================================

/**
 * Validar resposta com status code e schema
 * @param {object} response - Resposta da requisição
 * @param {number} expectedStatus - Status esperado
 * @param {string} schemaName - Nome do schema (opcional)
 */
Cypress.Commands.add(
    'validateResponse',
    (response, expectedStatus, schemaName = null) => {
        expect(response.status).to.eq(expectedStatus);

        if (schemaName) {
            const schemaValidator = require('../../schemas/schemaValidator');
            schemaValidator.validateSchema(response, schemaName);
        }

        return response;
    }
);

/**
 * Extrair valor específico da resposta
 * @param {object} response - Resposta da requisição
 * @param {string} path - Caminho para o valor (ex: 'user.id', 'data[0].name')
 */
Cypress.Commands.add('extractFromResponse', (response, path) => {
    const keys = path.split('.');
    let value = response.body;

    keys.forEach((key) => {
        if (key.includes('[')) {
            const arrayKey = key.split('[')[0];
            const index = parseInt(key.match(/\[(\d+)\]/)[1]);
            value = value[arrayKey][index];
        } else {
            value = value[key];
        }
    });

    return value;
});

/**
 * Comparar múltiplas respostas
 * @param {object} response1 - Primeira resposta
 * @param {object} response2 - Segunda resposta
 * @param {array} fieldsToCompare - Campos a comparar
 */
Cypress.Commands.add(
    'compareResponses',
    (response1, response2, fieldsToCompare = []) => {
        const body1 = response1.body;
        const body2 = response2.body;

        if (fieldsToCompare.length === 0) {
            expect(body1).to.deep.equal(body2);
        } else {
            fieldsToCompare.forEach((field) => {
                expect(body1[field]).to.equal(body2[field]);
            });
        }
    }
);
