const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));


// donacionesController.js
async function obtenerDonaciones(req, res) {
    try {
        // Realiza la consulta a la base de datos para obtener donaciones con el nombre del donante
        const donacionesConDonantes = await knex('donaciones')
            .select('donaciones.*', 'usuarios.nombre as nombre_donante')
            .join('usuarios', 'donaciones.user_id', '=', 'usuarios.id');

        // En este punto, `donacionesConDonantes` contiene los resultados de la consulta
        console.log(donacionesConDonantes);

        // Puedes enviar la información como respuesta JSON al cliente
        res.json({ donaciones: donacionesConDonantes });
    } catch (error) {
        console.error('Error al obtener las donaciones:', error);
        res.status(500).json({ error: 'Error al obtener las donaciones.' });
    }
}


module.exports = {
    obtenerDonaciones,
    // Agrega otras funciones de controlador según sea necesario
};
