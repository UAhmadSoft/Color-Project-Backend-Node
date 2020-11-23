const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   colors: [
      {
         name: {
            type: String,
            required: true,
            unique: true,
         },
         color: {
            type: String,
            required: true,
            unique: true,
         },
      },
   ],
   emoji: {
      type: String,
      required: true,
      default: '🎨',
   },
   _id: {
      type: String,
      default: name.replace('/ /g', '-'),
   },
});

export default PaletteModel = mongoose.model('Palette', paletteSchema);
