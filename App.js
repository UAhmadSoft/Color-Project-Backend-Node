const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DBConnect = require('./utils/DBConnect');
const Palette = require('./models/PaletteModel');

// ~ Configuring Environment Variables
dotenv.config({
   path: './config.env',
});

const app = express();
const urlEncodedParser = bodyParser.urlencoded({
   extended: false,
   useNewUrlParser: true,
});

// * Connecting to Databse
DBConnect();

// ? Middlewares
app.use(express.json());

// * Cors
app.use(cors());

app.use(morgan('dev'));

app.get('/api/v1/palettes', async (req, res) => {
   const palettes = await Palette.find();

   // console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
      data: palettes,
   });
});

app.post('/api/v1/palettes/', urlEncodedParser, async (req, res) => {
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
      _id: palette.id,
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

app.patch('/api/v1/palettes/:id', urlEncodedParser, async (req, res) => {
   const palette = req.body.palette;
   const currentPalette = await Palette.findById(req.params.id);

   console.log('palette', palette);

   if (!palette) {
      return res.status(400).json({
         status: 'fail',
         message: 'Plz send Palette with request',
      });
   }
   if (!currentPalette) {
      return res.status(404).json({
         status: 'fail',
         message: 'No Palette with that id',
      });
   }

   let updatedPalette;
   if (palette.id) {
      console.log('removing and creating updated Palette');
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

      console.log('currentPalette', currentPalette._doc);
      updatedPalette = await Palette.create(currentPalette._doc);
   } else {
      console.log('updated Palette');

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

   // console.log('palette', palette);

   // console.log('updatedPalette', updatedPalette);

   // console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
      data: updatedPalette,
   });
});

app.delete('/api/v1/palettes/:id', async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
