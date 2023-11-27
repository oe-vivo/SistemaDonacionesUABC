// migrations/20231124130000_migracion_roles.js
exports.up = function (knex) {
    return knex.schema.createTable('roles', function (table) {
        table.increments('role_id').primary();
        table.string('nombre_del_rol').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('roles');
};
