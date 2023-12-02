// knexfile.js
module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'erickson12',
        database: 'uabc',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
};