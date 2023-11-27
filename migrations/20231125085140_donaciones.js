/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('donaciones', function (table) {
        table.increments('donacion_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea que referencia la columna id de la tabla usuarios
        table.decimal('monto').notNullable();
        table.date('fecha_donacion').notNullable();
        table.binary('comprobante'); // Columna para almacenar el archivo de imagen del comprobante
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('donaciones');
};
