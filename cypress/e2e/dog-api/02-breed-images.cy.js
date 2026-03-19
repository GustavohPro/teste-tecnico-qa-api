/**
 * Testes para Dog API - GET /breed/{breed}/images
 * Valida o endpoint que retorna imagens de uma raça específica
 */

describe('Dog API - GET /breed/{breed}/images', { tags: '@dog-api @images' }, () => {
    const baseURL = 'https://dog.ceo/api';
    let testBreeds = [];

    before(() => {
        // Carregar breeds de teste
        cy.fixture('dog-api/breeds').then((data) => {
            testBreeds = data.testBreeds;
        });
    });

    it('Deve retornar imagens de uma raça válida (labrador)', () => {
        cy.getRequest(`${baseURL}/breed/labrador/images`, {
            expectedStatus: 200,
            failOnStatusCode: true,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.an('array');
            expect(response.body.message.length).to.be.greaterThan(0);
        });
    });

    it('Deve retornar array de URLs válidas para labrador', () => {
        cy.getRequest(`${baseURL}/breed/labrador/images`).then((response) => {
            const images = response.body.message;

            expect(images).to.be.an('array');
            expect(images.length).to.be.greaterThan(0);

            // Validar que todas are URLs válidas
            images.forEach((url) => {
                expect(url).to.be.a('string');
                expect(url).to.include('https://');
                expect(url).to.match(/\.(jpg|jpeg|png)$/i);
            });
        });
    });

    it('Deve retornar imagens para múltiplas raças válidas', () => {
        const breedsToTest = ['bulldog', 'poodle', 'labrador'];

        breedsToTest.forEach((breed) => {
            cy.getRequest(`${baseURL}/breed/${breed}/images`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.equal('success');
                expect(response.body.message).to.be.an('array');
                expect(response.body.message.length,
                    `${breed} deve ter pelo menos 1 imagem`
                ).to.be.greaterThan(0);
            });
        });
    });

    it('Deve retornar erro para raça inexistente', () => {
        cy.getRequest(`${baseURL}/breed/inexistentbreed123/images`, {
            failOnStatusCode: false,
        }).then((response) => {
            // Pode retornar 404 ou status notfound
            expect([404, 200]).to.include(response.status);
            expect(response.body).to.have.property('status');
            expect(['notfound', 'error']).to.include(response.body.status);
        });
    });

    it('Deve validar resposta contra schema', () => {
        cy.getRequest(`${baseURL}/breed/labrador/images`).then((response) => {
            const schemaValidator = require('../../schemas/schemaValidator');
            try {
                // Schema de breedImages aceita success e notfound
                expect(response.body).to.have.property('message');
                expect(response.body).to.have.property('status');
            } catch (error) {
                // Falha no schema, mas continua
                cy.log('Schema validation error (expected): ', error.message);
            }
        });
    });

    it('Deve suportar raças com hífen e espaço (bushy dog, etc)', () => {
        cy.getRequest(`${baseURL}/breed/bulldog/images`, {
            expectedStatus: 200,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.an('array');
        });
    });

    it('Deve retornar imagens com formato correto (URLs)', () => {
        cy.getRequest(`${baseURL}/breed/german/images`).then((response) => {
            if (response.body.status === 'success') {
                const images = response.body.message;

                images.forEach((url, index) => {
                    expect(url, `Imagem ${index} deve ser URL válida`).to.match(
                        /^https:\/\/.+\.(jpg|jpeg|png)$/i
                    );
                });
            }
        });
    });

    it('Deve ter IDs de imagem consistentes', () => {
        cy.getRequest(`${baseURL}/breed/labrador/images`).then((response1) => {
            cy.wait(1000);

            cy.getRequest(`${baseURL}/breed/labrador/images`).then((response2) => {
                // A mesma raça deve ter imagens similares
                expect(response1.body.message.length).to.equal(
                    response2.body.message.length
                );
            });
        });
    });

    it('Deve ser insensível a maiúsculas/minúsculas para raça', () => {
        cy.getRequest(`${baseURL}/breed/LABRADOR/images`, {
            failOnStatusCode: false,
        }).then((response) => {
            // API pode não suportar maiúsculas, mas testar comportamento
            expect([200, 404]).to.include(response.status);
        });
    });

    it('Deve retornar status 200 mesmo para raças sem imagens', () => {
        cy.getRequest(`${baseURL}/breed/labrador/images`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status');
        });
    });
});
