const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Tesseract = require('tesseract.js');

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
// Ruta para manejar la carga del archivo y el procesamiento OCR
router.post('/file-upload', uploader.single('receipt'), (req, res) => {
    const file = req.file;

    // Procesar el archivo con Tesseract.js para inglés y español
    Tesseract.recognize(
        file.path,
        'eng+spa', // Especificando inglés y español
    ).then(({ data: { text } }) => {
        // Utilizar una expresión regular para encontrar el monto después del signo "$"
        // La expresión ahora maneja comas dentro de las cantidades numéricas
        const regex = /\$(\d{1,3}(?:,\d{3})*(\.\d{2})?)/;
        const matches = regex.exec(text);

        let amount = null;
        if (matches && matches[1]) {
            // Eliminar las comas del monto extraído para procesamiento o almacenamiento adicional
            amount = matches[1].replace(/,/g, '');
            console.log('Monto de la transferencia detectado:', amount);
            console.log(text);
        } else {
            console.log('Monto de la transferencia no encontrado.');
        }

        res.send('Procesamiento completado. Monto detectado: ' + (amount || 'No encontrado.'));
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error al procesar el recibo');
    });
});

module.exports = router;
