const assert = require('assert');
const sql = require('../../src/common/sql');

describe('Tests for common sql utility functions', () => {
   describe('Test for function to create table from schema', () => {
       it('should create a valid table definition from schema', () => {
           const name = 'cooltable';
           const schema = {great: {type: 'text'}, skate: {type: 'text'}};
           assert.equal(
               sql.createTableFromSchema(name, schema),
               'create table cooltable (great text, skate text);'
           );
       });
   }) ;
});