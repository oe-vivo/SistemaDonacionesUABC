const db = require('../config/database'); // Reemplaza con la ruta correcta a tu archivo de configuración de la base de datos

// Modelo de usuario
class Usuario {
    constructor(correo, contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }

    static obtenerTodosLosUsuarios(callback) {
        const consulta = 'SELECT * FROM usuario';
        db.query(consulta, (error, resultados) => {
            if (error) {
                return callback(error, null);
            }
            const usuarios = resultados.map((resultado) => {
                return new Usuario(resultado.correo, resultado.contrasena);
            });
            callback(null, usuarios);
        });
    }
}

module.exports = Usuario;
