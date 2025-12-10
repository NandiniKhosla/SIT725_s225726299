const Book = require('../models/book.model');

const getAllBooks = async () => {
    // Fetch all books from MongoDB
    return await Book.find({});
};

const getBookById = async (id) => {
    // Find one book by our custom 'id' field (b1, b2...), NOT the Mongo _id
    return await Book.findOne({ id: id });
};

module.exports = {
    getAllBooks,
    getBookById
};