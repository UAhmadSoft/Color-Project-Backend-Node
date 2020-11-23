const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

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

// ? Middlewares
app.use(express.json());

app.get('/api/v1/palettes', async (req, res) => {
   const palettes = await Palette.find();

   console.log('palettes', palettes);
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

   const newPalette = await Palette.create({
      palette,
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

   if (!palette) {
      return res.status(400).json({
         status: 'fail',
         message: 'Plz send Palette with request',
      });
   }

   const updatedPalette = await Palette.findByIdAndUpdate(
      req.params.id,
      palette
   );

   if (!updatedPalette) {
      return res.status(500).json({
         status: 'error',
         message: 'Error Updating Palette . Plz try again later',
      });
   }

   // console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
      data: updatedPalette,
   });
});

app.delete('/api/v1/palettes/:id', async (req, res) => {
   await Palette.findByIdAndDelete(req.params.id);

   console.log('palettes', palettes);
   res.status(200).json({
      status: 'success',
   });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
