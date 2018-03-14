const assert = require('assert');
const sql = require('../src/common/sql');
const sqlite = require('sqlite3');
const data = require('../src/podcast/data');

const TEST_SCHEMA = {great: {type: "text"}, skate: {type: "text"}};
const TEST_TABLE_NAME = "testtable";

describe('Podcast data', () => {
    describe('creating podcast table', () => {
        it('should generate valid sql for a fake table', () => {
            const generatedSql = sql.createTableFromSchema(TEST_TABLE_NAME, TEST_SCHEMA);
            assert.equal(generatedSql, `create table ${TEST_TABLE_NAME} (great text, skate text)`);
        });
        it('should allow me to build a real table in sqlite', () => {
            const generatedSql = sql.createTableFromSchema(TEST_TABLE_NAME, TEST_SCHEMA);
            const db = new sqlite.Database(':memory:');
            db.serialize(() => {
                db.run(generatedSql);
                db.run(`insert into ${TEST_TABLE_NAME} (great, skate) values ("nice", "rice")`);
                db.each(`SELECT * from ${TEST_TABLE_NAME}`, (err, row) => {
                    assert.equal(row.great, 'nice');
                    assert.equal(row.skate, 'rice');
                });
            });
        });
    });
});