/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('administradoresUnidadAcademica', function (table) {
        table.increments('admin_unidad_academica_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea que referencia la columna id de la tabla usuarios
        table.string('unidad_academica').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('administradoresUnidadAcademica');
};
