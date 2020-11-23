const express = require('express');

const app = express();

app.get('/api/vs/palettes', (req, res) => {
   res.status(200).json('Palettes');
});
