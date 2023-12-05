/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments('id').primary();
        table.string('nombre').notNullable();
        table.string('correo_electronico').unique().notNullable();
        table.string('contrasena').notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('role_id').references('roles.role_id'); // Clave foránea que referencia la columna role_id de la tabla roles
        table.timestamps(true, true);
        table.boolean('activo');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};