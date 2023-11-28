// knexfile.js
module.exports = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'octavio',
        database: 'uabc',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
};
