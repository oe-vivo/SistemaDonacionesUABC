const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));

async function iniciarSesion(req, res) {
    try {
        const { correo_electronico, contrasena } = req.body;

        // Consulta para obtener el usuario con el correo proporcionado
        const usuario = await knex('usuarios').where({ correo_electronico }).first();

        if (usuario) {
            // Comparar la contraseña proporcionada con la almacenada en la base de datos
            if (contrasena === usuario.contrasena) {
                // Las credenciales son válidas, el usuario ha iniciado sesión con éxito
                //res.json({ mensaje: 'Inicio de sesión exitoso', usuario });
                res.redirect('/donacion');
            } else {
                // Contraseña incorrecta
                res.status(401).json({ error: 'Credenciales inválidas' });
            }
        } else {
            // Usuario no encontrado
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await knex('usuarios').select('*');
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
}

async function crearUsuario(req, res) {
    try {
        const { nombre, correo_electronico, contrasena, role_id } = req.body;

        // Hash de la contraseña antes de almacenarla en la base de datos
        const hashContrasena = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = {
            nombre: nombre,
            correo_electronico: correo_electronico,
            contrasena: hashContrasena,
            role_id: role_id,
        };

        const resultado = await knex('usuarios').insert(nuevoUsuario);
        res.json({ mensaje: 'Usuario creado con éxito', id: resultado[0] });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario.' });
    }
}


async function actualizarUsuario(req, res) {
    try {
        const idUsuario = req.params.id;
        const datosActualizados = req.body;
        // Si se está actualizando la contraseña, realizar el hash
        if (datosActualizados.contrasena) {
            datosActualizados.contrasena = await bcrypt.hash(datosActualizados.contrasena, 10);
        }
        await knex('usuarios').where({ id: idUsuario }).update(datosActualizados);
        res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario.' });
    }
}

async function eliminarUsuario(req, res) {
    try {
        const idUsuario = req.params.id;
        await knex('usuarios').where({ id: idUsuario }).del();
        res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario.' });
    }
}

module.exports = {
    iniciarSesion,
    crearUsuario,
    // Agrega otras funciones de controlador según sea necesario
};
