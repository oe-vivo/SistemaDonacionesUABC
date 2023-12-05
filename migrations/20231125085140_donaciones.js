/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('donaciones', function (table) {
        table.increments('donacion_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea
        table.decimal('monto').notNullable();
        table.date('fecha_donacion').notNullable();
        table.string('ruta_comprobante'); // Cambiado para almacenar la ruta del archivo
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('donaciones');
};
