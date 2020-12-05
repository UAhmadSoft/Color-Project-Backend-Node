const express = require('express');
const bodyParser = require('body-parser');

const PaletteController = require('../Controllers/PaletteController');

const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({
   extended: false,
   useNewUrlParser: true,
});

router

   .route('/')
   .get(PaletteController.getAllPalettes)
   .post(PaletteController.addNewPalette);

router
   .route('/:id')
   .patch(urlEncodedParser, PaletteController.updatePalatte)
   .delete(urlEncodedParser, PaletteController.deletePalette);

module.exports = router;
