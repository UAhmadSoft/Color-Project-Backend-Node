const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   colors: [
      {
         name: {
            type: String,
            required: true,
            unique: false,
         },
         color: {
            type: String,
            required: true,
            // unique: true,
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
      // default: name.replace('/ /g', '-'),
   },
});

module.exports = mongoose.model('Palette', paletteSchema);
