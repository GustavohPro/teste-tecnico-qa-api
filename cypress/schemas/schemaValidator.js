const Ajv = require('ajv');
const schemas = require('./dog-api/dogApiSchemas');

const ajv = new Ajv();

/**
 * Valida resposta contra um schema
 * @param {object} response - Resposta a ser validada
 * @param {string} schemaName - Nome do schema em dogApiSchemas
 * @returns {boolean} - true se válido, lança erro caso contrário
 */
function validateSchema(response, schemaName) {
    const schema = schemas[schemaName];

    if (!schema) {
        throw new Error(`Schema "${schemaName}" não encontrado`);
    }

    const validate = ajv.compile(schema);
    const isValid = validate(response.body);

    if (!isValid) {
        console.error(`Validação falhou para ${schemaName}:`, validate.errors);
        throw new Error(`Resposta não corresponde ao schema ${schemaName}`);
    }

    return true;
}

module.exports = {
    validateSchema,
    schemas,
};
