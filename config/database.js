const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'octavio',
    database: 'uabc',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

module.exports = db;
