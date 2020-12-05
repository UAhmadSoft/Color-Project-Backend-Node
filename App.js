// Third Party Modules
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Routers
const PaletteRouter = require('./Routes/PaletteRouter');

// Utils
const DBConnect = require('./utils/DBConnect');

// ~ Configuring Environment Variables
dotenv.config({
   path: './config.env',
});

const app = express();

// * Connecting to Databse
DBConnect();

// ? Middlewares
app.use(express.json());

// * Cors
app.use(cors());

app.use(morgan('dev'));

//  * Routes
app.use('/api/v1/palettes', PaletteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
