/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('informesDeDonaciones', function (table) {
        table.increments('informe_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('usuarios.id'); // Clave foránea que referencia la columna id de la tabla usuarios
        table.date('fecha_creacion').notNullable();
        table.text('contenido_informe').notNullable();
        table.string('carrera_destino').notNullable();
        table.enum('estatus', ['En Revisión', 'Aprobado', 'Rechazado', 'Finalizado']).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('informesDeDonaciones');
};