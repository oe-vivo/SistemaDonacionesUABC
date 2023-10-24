const express = require('express');
const app = express();

// ...

// Controlador para mostrar el formulario de inicio de sesión
app.get('/mostrar-login', (req, res) => {
    // Renderiza la vista del formulario de inicio de sesión
    res.render('login.twig');
});

// ...

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
