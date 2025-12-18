/**
 * app.js
 * This file configures the Express application.
 * It defines middleware and routes but does NOT start the server.
 * This separation makes the app easier to test.
 */

const express = require('express');
const mathRoutes = require('./routes/mathRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Register application routes
app.use('/api', mathRoutes);

// Export app for testing purposes
module.exports = app;
