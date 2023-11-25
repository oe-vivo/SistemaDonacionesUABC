const knex = require('knex')(require('../knexfile'));

async function obtenerRoles(req, res) {
    try {
        const resultados = await knex('roles').select('*');
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla.' });
    }
}

async function crearRol(req, res) {
    try {
        const nuevoRol = req.body;
        const resultado = await knex('roles').insert(nuevoRol);
        res.json({ mensaje: 'Rol creado con éxito', id: resultado[0] });
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ error: 'Error al crear el rol.' });
    }
}

async function actualizarRol(req, res) {
    try {
        const idRol = req.params.id;
        const datosActualizados = req.body;
        await knex('roles').where({ id: idRol }).update(datosActualizados);
        res.json({ mensaje: 'Rol actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ error: 'Error al actualizar el rol.' });
    }
}

async function eliminarRol(req, res) {
    try {
        const idRol = req.params.id;
        await knex('roles').where({ id: idRol }).del();
        res.json({ mensaje: 'Rol eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        res.status(500).json({ error: 'Error al eliminar el rol.' });
    }
}

module.exports = {
    obtenerRoles,
    crearRol,
    actualizarRol,
    eliminarRol,
};