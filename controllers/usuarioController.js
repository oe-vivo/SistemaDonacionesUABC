const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));

async function iniciarSesion(req, res) {
    console.log('Cuerpo de la solicitud:', req.body);
    try {
        const { correo_electronico, contrasena } = req.body;

        // Consulta para obtener el usuario con el correo proporcionado
        const usuario = await knex('usuarios').where({ correo_electronico }).first();

        if (usuario) {
            // Comparar la contraseña proporcionada con la almacenada en la base de datos
            const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

            if (contrasenaValida) {
                // Las credenciales son válidas, actualizar el atributo activo a true
                await knex('usuarios').where({ correo_electronico }).update({ activo: true });

                // Verificar si 'usuario' tiene la propiedad 'id' antes de acceder a ella
                if (usuario.id) {
                    // Verificar el id_rol del usuario
                    if (usuario.role_id === 1) {
                        // Si es un usuario con id_rol 1, redirigir a la vista de donación
                        return res.redirect('/donacion');
                    } else if (usuario.role_id === 2) {
                        // Si es un usuario con id_rol 2, redirigir a otra vista
                        return res.redirect('/Administrador');
                    } else {
                        // Manejar otros casos de id_rol según sea necesario
                        return res.status(403).json({ error: 'Acceso no autorizado' });
                    }
                } else {
                    // Manejar el caso donde 'id' no está definido en 'usuario'
                    return res.status(500).json({ error: 'Error al obtener la información del usuario.' });
                }
            } else {
                // Contraseña incorrecta
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
        } else {
            // Usuario no encontrado
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error al iniciar sesión.' });
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
        if (!req.body || !req.body.nombre || !req.body.correo_electronico || !req.body.contrasena || !req.body.role_id) {
            return res.status(400).json({ error: 'Datos de formulario incompletos' });
        }

        const { nombre, correo_electronico, contrasena, role_id } = req.body;

        // Hash de la contraseña antes de almacenarla en la base de datos
        try {
            const hashContrasena = await bcrypt.hash(contrasena, 10);

            const nuevoUsuario = {
                nombre: nombre,
                correo_electronico: correo_electronico,
                contrasena: hashContrasena,
                role_id: role_id,
            };

            const resultado = await knex('usuarios').insert(nuevoUsuario);

            // Redirige a la vista deseada (reemplaza '/otra-vista' con la ruta real)
            res.redirect('/login');
        } catch (error) {
            console.error('Error al hacer el hash de la contraseña:', error);
            return res.status(500).json({ error: 'Error al procesar la contraseña.' });
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ error: 'Error al crear usuario.' });
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
    obtenerUsuarios,
    eliminarUsuario,
    // Agrega otras funciones de controlador según sea necesario
};
