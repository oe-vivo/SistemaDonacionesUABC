/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('administradores_sistema', function (table) {
        table.increments('admin_sistemas_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea que referencia la columna id de la tabla usuarios
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('administradores_sistema');
};