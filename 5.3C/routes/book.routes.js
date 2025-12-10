const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// GET /api/books
router.get('/books', bookController.getAllBooks);

// GET /api/books/:id
router.get('/books/:id', bookController.getBookById);

// GET /api/integrity-check42
router.get('/integrity-check42', (req, res) => {
    res.sendStatus(204); // Returns 204 No Content
});

module.exports = router;