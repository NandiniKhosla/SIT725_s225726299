const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book.routes');
const path = require('path');

const app = express();
const PORT = 3000;

// Hardcoded URI as per instructions
const MONGO_URI = 'mongodb://localhost:27017/sit725_books_db';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', bookRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});