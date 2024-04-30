// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize `app` variable
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Use `body-parser` after initializing `app`
app.use(morgan('dev'));

// Set up routes
app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/api/v1/auth', require('./routes/sendEmail'));

// Start the server
const PORT = process.env.PORT || 4848;
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`.bgGreen.white);
});
