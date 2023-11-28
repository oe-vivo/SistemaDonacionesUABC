const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Tesseract = require('tesseract.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'constanciasFiscales/'); // Asegúrate de que esta carpeta exista o Multer la creará
    },
    filename: function (req, file, cb) {
        // Aquí puedes personalizar cómo se nombra el archivo en el servidor
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: storage });
// Ruta para manejar la carga del archivo y el procesamiento OCR
router.post('/file-uploadRFC', uploader.single('receipt'), (req, res) => {
    const file = req.file;

    // Procesar el archivo con Tesseract.js para inglés y español
    Tesseract.recognize(
        file.path,
        'eng+spa', // Especificando inglés y español
    ).then(({ data: { text } }) => {
        // Utilizar una expresión regular para encontrar el RFC después de la frase
        // "\s*" coincide con cualquier cantidad de espacios en blanco
        // "\s+" coincide con uno o más espacios en blanco (incluyendo saltos de línea)
        const regexRfc = /Registro Federal de Contribuyentes:\s+([A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?)/;
        const matchesRfc = regexRfc.exec(text);

        let rfc = null;
        if (matchesRfc && matchesRfc[1]) {
            rfc = matchesRfc[1].trim(); // ".trim()" elimina espacios en blanco adicionales alrededor del RFC
            console.log('RFC detectado:', rfc);
        } else {
            console.log('RFC no encontrado.');
        }

        res.send('Procesamiento completado. RFC detectado: ' + (rfc || 'No encontrado.'));
        console.log(text);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error al procesar el archivo');
    });
});

module.exports = router;
