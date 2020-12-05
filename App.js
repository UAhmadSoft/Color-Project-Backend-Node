// Third Party Modules
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Routers
const PaletteRouter = require('./Routes/PaletteRouter');

// Utils
const DBConnect = require('./utils/DBConnect');
const AppError = require('./utils/AppError');
const ErrorController = require('./Controllers/ErrorController');

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

// ! 404 Route Handler
app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ? Use Global Error handler
app.use(ErrorController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
