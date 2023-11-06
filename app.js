const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); // Reemplaza con la ruta correcta a tu archivo de configuración de la base de datos
const twig = require('twig');
const usuarioController = require('./controllers/usuarioController');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
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


app.post('/iniciarSesion', usuarioController.iniciarSesion);



// Incluye más rutas y controladores según tus necesidades

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
