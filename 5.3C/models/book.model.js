const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Custom ID (b1, b2, etc.)
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true } // AUD Price
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;