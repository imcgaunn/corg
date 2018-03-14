// handy sql helpers.
const _ = require('lodash');

const createTableFromSchema = (name, schema) => {
    const columnDecls = _.map(schema, (k, v) => {
        const type = k.type;
        return `${v} ${type}`;
    });
    const fullColumnDeclaration =_.join(columnDecls, ', ');
    const sql = `create table ${name} (${fullColumnDeclaration});`;
    return sql;
};

module.exports = {createTableFromSchema};