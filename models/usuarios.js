const db = require('../config/database'); // Reemplaza con la ruta correcta a tu archivo de configuración de la base de datos

// Modelo de usuario
class Usuario {
    constructor(correo_electronico, contrasena) {
        this.correo_electronico = correo_electronico;
        this.contrasena = contrasena;
    }

    static obtenerTodosLosUsuarios(callback) {
        const consulta = 'SELECT correo_electronico, contrasena FROM usuarios';
        db.query(consulta, (error, resultados) => {
            if (error) {
                return callback(error, null);
            }
            const usuarios = resultados.map((resultado) => {
                return new Usuario(resultado.correo_electronico, resultado.contrasena);
            });
            callback(null, usuarios);
        });
    }
}

module.exports = Usuario;
