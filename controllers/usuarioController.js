const Usuario = require('../models/usuarios');

// Controlador para procesar el inicio de sesión
exports.iniciarSesion = (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    console.log('datos', req.body);

    // Obtener todos los usuarios
    Usuario.obtenerTodosLosUsuarios((error, usuarios) => {
        console.log('bien');
        if (error) {
            // Manejo de errores
            console.error(error);
            res.status(500).send('Error en el servidor');
            return; // Salir del controlador
        }

        // Buscar un usuario con el correo proporcionado
        const usuario = usuarios.find((u) => u.correo_electronico === correo_electronico);
        console.log('bien2')

        if (!usuario) {
            console.log('mal');
            // Usuario no encontrado, muestra un mensaje de error
            res.render('login.twig', { error: 'Usuario no encontrado' });
        } else {
            console.log('bienx3');
            // Usuario encontrado, verifica la contraseña
            if (contrasena === usuario.contrasena) {
                console.log('vamo');
                // Contraseña correcta, redirige al usuario a la página deseada
                res.redirect('/donacion');
            } else {
                console.log('malx2');
                // Contraseña incorrecta, muestra un mensaje de error
                res.render('login.twig', { error: 'Credenciales incorrectas' });
            }
        }
    });
};
