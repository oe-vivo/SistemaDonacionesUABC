const express = require('express');
const router = express.Router();
const multer = require('multer');
const Tesseract = require('tesseract.js');
const knex = require('knex')(require('./knexfile'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista o Multer la creará
    },
    filename: function (req, file, cb) {
        // Aquí puedes personalizar cómo se nombra el archivo en el servidor
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: storage });

router.post('/file-upload', uploader.single('receipt'), async (req, res) => {
    const file = req.file;

    try {
        const { data: { text } } = await Tesseract.recognize(file.path, 'eng+spa');
        console.log('Texto completo reconocido:', text); // Imprime el texto reconocido para depuración

        // Utilizar una expresión regular para encontrar el monto después del signo "$"
        const regex = /\$(\d{1,3}(?:,\d{3})*(\.\d{2})?)/;
        const matches = regex.exec(text);

        if (matches && matches[1]) {
            const amount = matches[1].replace(/,/g, '');

            // Buscar el ID del usuario activo
            const activeUser = await knex('usuarios').where('activo', true).first();
            if (!activeUser) {
                return res.status(401).send('No hay ningún usuario activo en la sesión.');
            }

            // Insertar un nuevo registro en la base de datos con la información de la donación
            await knex('donaciones').insert({
                user_id: activeUser.id, // Suponiendo que activeUser.id contiene el ID del usuario
                monto: amount,
                fecha_donacion: new Date(),
                ruta_comprobante: file.path,
                created_at: new Date(),
                updated_at: new Date()
            });

            // Actualizar el estado del usuario a 'no activo'
            await knex('usuarios')
                .where('id', activeUser.id)
                .update({ activo: false });

            res.redirect('/'); // Redirigir al usuario a la página '/nosotros'
        } else {
            console.log('Monto de la transferencia no encontrado.');
            res.status(400).send('No se pudo detectar el monto en el recibo.');
        }
    } catch (err) {
        console.error('Error al procesar el archivo:', err);
        res.status(500).send('Error al procesar el archivo.');
    }
});

module.exports = router;
