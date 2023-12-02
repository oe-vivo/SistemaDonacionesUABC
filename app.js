const express = require('express');
const bodyParser = require('body-parser');
const twig = require('twig');
const rolesController = require('./controllers/rolesController');
const usuarioController = require('./controllers/usuarioController');
const knex = require('knex')(require('./knexfile'));
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define tus rutas y controladores aquí

app.get('/', (req, res) => {
    // Renderiza una vista Twig
    res.render('nosotros.twig');
});

app.get('/login', (req, res) => {
    // Renderiza una vista Twig
    res.render('login.twig');
});

app.get('/donacion', (req, res) => {
    // Renderiza una vista Twig
    res.render('donacion.twig');
});

app.get('/Administrador', (req, res) => {
    // Renderiza una vista Twig
    res.render('Administrador.twig');
});


app.get('/Registro', (req, res) => {
    // Renderiza una vista Twig
    res.render('Registro.twig');
});

app.get('/Factura', (req, res) => {
    // Renderiza una vista Twig
    res.render('Factura.twig');
});


app.use((req, res, next) => {
    console.log('Cuerpo de la solicitud:', req.body);
    next();
});

// Rutas para roles
// Ruta para obtener toda la información de la tabla
app.get('/api/roles', rolesController.obtenerRoles);

// Crear un nuevo rol
app.post('/api/roles', rolesController.crearRol);

// Actualizar un rol existente
app.put('/api/roles/:id', rolesController.actualizarRol);

// Eliminar un rol
app.delete('/api/roles/:id', rolesController.eliminarRol);

// Incluye más rutas y controladores según se necesite

// Agrega esto al final de tu archivo (después de las rutas existentes)
app.post('/crearUsuario', usuarioController.crearUsuario);
app.post('/iniciarSesion', usuarioController.iniciarSesion);

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});