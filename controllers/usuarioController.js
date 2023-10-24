const Usuario = require('../models/usuarios');

// Controlador para procesar el inicio de sesión
exports.iniciarSesion = (req, res) => {
    const { correo, contrasena } = req.body;
    console.log('datos',req.body);

    // Obtener todos los usuarios
    Usuario.obtenerTodosLosUsuarios((error, usuarios) => {
        if (error) {
            // Manejo de errores
            res.status(500).send('Error en el servidor');
        }

        // Buscar un usuario con el correo proporcionado
        const usuario = usuarios.find((u) => u.correo === correo);

        if (!usuario) {
            // Usuario no encontrado, muestra un mensaje de error
            res.render('login.twig', { error: 'Usuario no encontrado' });
        } else {
            // Usuario encontrado, verifica la contraseña
            if (contrasena === usuario.contrasena) {
                // Contraseña correcta, redirige al usuario a la página deseada
                res.redirect('/donacion');
            } else {
                // Contraseña incorrecta, muestra un mensaje de error
                res.render('login.twig', { error: 'Credenciales incorrectas' });
            }
        }
    });
};

