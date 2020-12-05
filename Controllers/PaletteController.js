const Palette = require('../models/PaletteModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllPalettes = CatchAsync(async (req, res, next) => {
   const palettes = await Palette.find();

   // console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
      data: palettes,
   });
});

exports.addNewPalette = CatchAsync(async (req, res, next) => {
   const palette = req.body.palette;

   if (!palette) {
      return res.status(400).json({
         status: 'fail',
         message: 'Plz send Palette with request',
      });
   }

   // console.log('palette', palette);

   const newPalette = await Palette.create({
      name: palette.paletteName,
      _id: palette.id.toLowerCase(),
      emoji: palette.emoji,
      colors: palette.colors,
   });

   if (!newPalette) {
      return res.status(500).json({
         status: 'error',
         message: 'Error Creating New Palette . Plz try again later',
      });
   }

   // console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
      data: newPalette,
   });
});

exports.updatePalatte = CatchAsync(async (req, res, next) => {
   const currentPalette = await Palette.findById(req.params.id);

   if (!currentPalette) {
      return res.status(404).json({
         status: 'fail',
         message: 'No Palette with that id',
      });
   }

   const palette = req.body.palette;
   console.log('palette', palette);

   if (!palette) {
      return res.status(400).json({
         status: 'fail',
         message: 'Plz send Palette with request',
      });
   }

   let updatedPalette;
   if (palette.id) {
      // ! We Can't mutate id so remove Palette and make new one
      // remove existing Palette

      await Palette.findByIdAndDelete(req.params.id);

      currentPalette._id = palette.id;

      if (palette.paletteName) {
         palette['name'] = palette.paletteName;
         delete palette['paletteName'];
      }

      Object.keys(currentPalette._doc).forEach(function (key) {
         if (palette[key]) currentPalette._doc[key] = palette[key];
      });

      // console.log('currentPalette', currentPalette._doc);
      updatedPalette = await Palette.create(currentPalette._doc);
   } else {
      // console.log('updated Palette');

      updatedPalette = await Palette.findByIdAndUpdate(req.params.id, palette, {
         new: true,
      });
   }

   if (!updatedPalette) {
      return res.status(500).json({
         status: 'error',
         message: 'Error Updating Palette . Plz try again later',
      });
   }

   res.status(200).json({
      status: 'success',
      data: updatedPalette,
   });
});

exports.deletePalette = CatchAsync(async (req, res, next) => {
   const palette = await Palette.findByIdAndDelete(req.params.id);

   if (!palette) {
      return res.status(404).json({
         status: `No Palette with id  ${req.params.id}`,
      });
   }

   res.status(200).json({
      status: 'success',
   });
});
