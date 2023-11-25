/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('donadores', function (table) {
        table.increments('donador_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea que referencia la columna id de la tabla usuarios
        table.string('rfc').notNullable();
        table.binary('constancia_fiscal'); // Columna para almacenar el archivo de imagen de la constancia fiscal
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('donadores');
};