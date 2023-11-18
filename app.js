const express = require('express');
const bodyParser = require('body-parser');
const twig = require('twig');
const rolesController = require('./controllers/rolesController');
const usuarioController = require('./controllers/usuarioController');

const app = express();
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

app.post('/iniciarSesion', usuarioController.iniciarSesion);

// Rutas para roles
app.get('/api/roles', rolesController.obtenerRoles);
app.post('/api/roles', rolesController.crearRol);
app.put('/api/roles/:id', rolesController.actualizarRol);
app.delete('/api/roles/:id', rolesController.eliminarRol);

// Incluye más rutas y controladores según tus necesidades

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});