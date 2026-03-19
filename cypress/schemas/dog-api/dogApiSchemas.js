/**
 * JSON Schemas para validação dos endpoints da Dog API
 * Baseado em: https://dog.ceo/dog-api/documentation
 */

module.exports = {
    // Schema para GET /breeds/list/all
    breedsListSchema: {
        type: 'object',
        properties: {
            message: {
                type: 'object',
                additionalProperties: {
                    oneOf: [
                        { type: 'array', items: { type: 'string' } },
                        { type: 'array', items: { type: 'array', items: { type: 'string' } } },
                    ],
                },
            },
            status: {
                type: 'string',
                enum: ['success'],
            },
        },
        required: ['message', 'status'],
        additionalProperties: false,
    },

    // Schema para GET /breed/{breed}/images
    breedImagesSchema: {
        type: 'object',
        properties: {
            message: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'uri',
                },
            },
            status: {
                type: 'string',
                enum: ['success', 'notfound'],
            },
        },
        required: ['message', 'status'],
        additionalProperties: false,
    },

    // Schema para GET /breeds/image/random
    randomImageSchema: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                format: 'uri',
            },
            status: {
                type: 'string',
                enum: ['success'],
            },
        },
        required: ['message', 'status'],
        additionalProperties: false,
    },

    // Schema para resposta de sucesso genérica
    successResponseSchema: {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                enum: ['success'],
            },
        },
        required: ['status'],
    },

    // Schema para resposta de erro
    errorResponseSchema: {
        type: 'object',
        properties: {
            message: {
                oneOf: [
                    { type: 'string' },
                    { type: 'array' },
                    { type: 'object' },
                ],
            },
            status: {
                type: 'string',
                enum: ['success', 'notfound'],
            },
        },
        required: ['message', 'status'],
    },
};
