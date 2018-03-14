// functions that translate podcast data
// returned by the api to the format
// used for database persistence.
const sql = require('../common/sql');
const db = require('sqlite3');
const _ = require('lodash');

const PODCAST_FEED_TABLE_SCHEMA = {
    feedTitle: {
        type: "text",
        default: "placeholder",
        nullable: false
    },
    feedDescription: {
        type: "text",
        default: "placeholder",
        nullable: false
    },
    feedAuthor: {
        type: "text",
        default: "placeholder",
        nullable: false
    },
    feedImageUrl: {
        type: "text",
        default: "placeholder",
        nullable: false
    },
    updatedTime: {
        type: "date",
        default: "placeholder",
        nullable: false
     }
};

const PODCAST_FEED_TABLE_NAME = 'podcastfeeds';

const createPodcastTable = () => {
    return sql.createTableFromSchema(PODCAST_FEED_TABLE_NAME, PODCAST_FEED_TABLE_SCHEMA);
};

const addPodcast = (conn, podcast) => {
    // podcast is a big ol object with all the necessary podcast
    // keys. see PODCAST_FEED_TABLE_SCHEMA above.
    const cols = (_.keys(PODCAST_FEED_TABLE_SCHEMA).join(', ')).strip();
    const vals = _.map(_.keys(PODCAST_FEED_TABLE_SCHEMA), (key) => {
        return `"${podcast[key]}"`;
    }).join(', ').strip();
    const sql = `insert into ${PODCAST_FEED_TABLE_NAME} (${cols}) values (${vals})`;
};

module.exports = {createPodcastTable};
