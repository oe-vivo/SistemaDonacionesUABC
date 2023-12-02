// knexfile.js
module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'uabc',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
};