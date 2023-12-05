const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const router = express.Router();
const knex = require('knex')(require('./knexfile'));

// Configuración del almacenamiento de Multer para constancias fiscales
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'constanciasFiscales/'); // Asegúrate de que esta carpeta exista o Multer la creará
    },
    filename: function (req, file, cb) {
        // Personaliza cómo se nombra el archivo en el servidor
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: storage });

// Ruta para manejar la carga del archivo y el procesamiento OCR
router.post('/file-uploadRFC', uploader.single('receipt'), async (req, res) => {
    const file = req.file;

    try {
        // Extraer el texto con Tesseract
        const { data: { text } } = await Tesseract.recognize(file.path, 'eng+spa');
        const regexRfc = /Registro Federal de Contribuyentes:\s*([^\r\n]+)/;
        const matchesRfc = regexRfc.exec(text);

        if (matchesRfc && matchesRfc[1]) {
            const rfc = matchesRfc[1].trim();

            // Buscar la donación más reciente para obtener el user_id
            const latestDonation = await knex('donaciones').orderBy('created_at', 'desc').first();
            if (!latestDonation) {
                return res.status(400).send('No se encontraron donaciones recientes.');
            }

            // Crear un registro en la tabla 'donadores'
            await knex('donadores').insert({
                user_id: latestDonation.user_id,
                rfc: rfc,
                constancia_fiscal: file.path,
                created_at: new Date(),
                updated_at: new Date()
            });

            res.redirect('/'); // Redirigir al usuario a la página '/nosotros'
        } else {
            console.log('RFC no encontrado.');
            res.status(400).send('RFC no detectado en la constancia.');
        }
    } catch (err) {
        console.error('Error al procesar el archivo:', err);
        res.status(500).send('Error al procesar el archivo.');
    }
});


module.exports = router;
