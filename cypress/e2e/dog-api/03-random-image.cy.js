/**
 * Testes para Dog API - GET /breeds/image/random
 * Valida o endpoint que retorna uma imagem aleatória de um cachorro
 */

describe('Dog API - GET /breeds/image/random', { tags: '@dog-api @random' }, () => {
    const baseURL = 'https://dog.ceo/api';

    it('Deve retornar uma imagem aleatória com status sucesso', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`, {
            expectedStatus: 200,
            failOnStatusCode: true,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message');
        });
    });

    it('Deve retornar URL válida de imagem', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
            const imageUrl = response.body.message;

            expect(imageUrl).to.be.a('string');
            expect(imageUrl).to.include('https://');
            expect(imageUrl).to.match(/\.(jpg|jpeg|png)$/i);
            expect(imageUrl).to.include('dog.ceo');
        });
    });

    it('Deve retornar imagens diferentes em múltiplas chamadas', () => {
        const imageUrls = [];

        // Fazer 5 requisições
        for (let i = 0; i < 5; i++) {
            cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
                imageUrls.push(response.body.message);
            });
        }

        // Verificar que temos pelo menos 2 imagens diferentes
        cy.then(() => {
            const uniqueUrls = new Set(imageUrls);
            expect(uniqueUrls.size).to.be.greaterThan(1);
        });
    });

    it('Deve validar formato de resposta', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
            expect(response.body).to.have.all.keys('message', 'status');
            expect(Object.keys(response.body).length).to.equal(2);
        });
    });

    it('Deve retornar imagem de raça valida', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
            const imageUrl = response.body.message;

            // URL deve conter um nome de raça
            expect(imageUrl).to.match(/\/[a-z-]+\/[a-z0-9_-]+\.(jpg|jpeg|png)$/i);
        });
    });

    it('Deve ter status sempre como success', () => {
        // Fazer 3 requisições
        for (let i = 0; i < 3; i++) {
            cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
                expect(response.body.status).to.equal('success');
            });
        }
    });

    it('Deve retornar resposta em tempo razoável', () => {
        const startTime = Date.now();

        cy.getRequest(`${baseURL}/breeds/image/random`, {
            timeout: 10000,
        }).then((response) => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            expect(responseTime).to.be.lessThan(3000);
            expect(response.status).to.eq(200);
        });
    });

    it('Deve conter domínio dog.ceo em todas as imagens aleatórias', () => {
        for (let i = 0; i < 3; i++) {
            cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
                expect(response.body.message).to.include('dog.ceo');
            });
        }
    });

    it('Deve retornar imagem com extensão válida', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
            const imageUrl = response.body.message;
            const validExtensions = ['.jpg', '.jpeg', '.png'];

            const hasValidExtension = validExtensions.some((ext) =>
                imageUrl.toLowerCase().endsWith(ext)
            );

            expect(hasValidExtension).to.be.true;
        });
    });

    it('Deve ser acessível a qualquer hora (sem rate limit)', () => {
        // Fazer múltiplas requisições rápidas
        const requests = [];
        for (let i = 0; i < 5; i++) {
            requests.push(cy.getRequest(`${baseURL}/breeds/image/random`));
        }

        // Todas devem ter sucesso
        cy.wrap(requests).then(() => {
            cy.log('Todas as 5 requisições foram bem-sucedidas');
        });
    });

    it('Deve retornar response válido com content-type json', () => {
        cy.getRequest(`${baseURL}/breeds/image/random`).then((response) => {
            expect(response.headers).to.have.property('content-type');
            expect(response.headers['content-type']).to.include('application/json');
        });
    });
});
