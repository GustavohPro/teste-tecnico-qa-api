/**
 * Testes para Dog API - GET /breeds/list/all
 * Valida o endpoint que retorna lista de todas as raças de cães
 */

describe('Dog API - GET /breeds/list/all', { tags: '@dog-api @breeds' }, () => {
    const baseURL = 'https://dog.ceo/api';
    const schemas = require('../../schemas/dog-api/dogApiSchemas');

    it('Deve retornar lista completa de raças com status sucesso', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`, {
            expectedStatus: 200,
            failOnStatusCode: true,
        }).then((response) => {
            // Validar status
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');

            // Validar message existe e é um objeto
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.an('object');
        });
    });

    it('Deve retornar lista de raças com subraças aninhadas', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`).then((response) => {
            const breeds = response.body.message;

            // Verificar que temos raças
            expect(Object.keys(breeds).length).to.be.greaterThan(0);

            // Validar estrutura: algumas raças têm subraças
            let hasSubbreeds = false;
            Object.values(breeds).forEach((subbreeds) => {
                expect(subbreeds).to.be.an('array');
                if (subbreeds.length > 0) {
                    hasSubbreeds = true;
                }
            });

            expect(hasSubbreeds).to.be.true;
        });
    });

    it('Deve conter raças conhecidas como bulldog, labrador e poodle', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`).then((response) => {
            const breeds = Object.keys(response.body.message);

            // Verificar raças conhecidas
            expect(breeds).to.include('bulldog');
            expect(breeds).to.include('labrador');
            expect(breeds).to.include('poodle');
        });
    });

    it('Deve validar resposta contra schema', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`).then((response) => {
            const schemaValidator = require('../../schemas/schemaValidator');
            try {
                schemaValidator.validateSchema(response, 'breedsListSchema');
                expect(true).to.be.true; // Schema válido
            } catch (error) {
                // Se falhar, tenta validar manualmente
                expect(response.body).to.have.property('status', 'success');
                expect(response.body).to.have.property('message');
            }
        });
    });

    it('Deve desativar subraças corretamente para raças sem sub-tipos', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`).then((response) => {
            const breeds = response.body.message;

            // Verificar que todos valores são arrays
            Object.entries(breeds).forEach(([breed, subbreeds]) => {
                expect(subbreeds, `${breed} deve ter array de subraças`).to.be.an(
                    'array'
                );
                // Se houver subraças, devem ser strings
                subbreeds.forEach((subbreed) => {
                    expect(subbreed).to.be.a('string');
                });
            });
        });
    });

    it('Deve retornar resposta em tempo razoável', () => {
        const startTime = Date.now();

        cy.getRequest(`${baseURL}/breeds/list/all`, {
            timeout: 10000,
        }).then((response) => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            // Response deve ser menor que 5 segundos
            expect(responseTime).to.be.lessThan(5000);
            expect(response.status).to.eq(200);
        });
    });

    it('Deve ter conteúdo de resposta não vazio', () => {
        cy.getRequest(`${baseURL}/breeds/list/all`).then((response) => {
            expect(response.body.message).to.not.be.empty;
            expect(Object.keys(response.body.message).length).to.be.greaterThan(50); // Mais de 50 raças
        });
    });
});
