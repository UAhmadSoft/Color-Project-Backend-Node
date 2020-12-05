const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A Palette must have a name'],
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
