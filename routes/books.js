var express = require('express');
var mongoose = require("mongoose");
var book = mongoose.model("book");
const { jwtVerify } = require('../helpers/jwt');
const { body, validationResult } = require('express-validator');
var router = express.Router();

router.get('/', jwtVerify, async (req, res) => {
    const { page = 1, limit = 10, title, author, genre, sort } = req.query;
    const query = { isActive: true };
    if (title) query.title = new RegExp(title, 'i');
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    try {
        const books = await book.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await book.countDocuments(query);
        res.json({ total, page, books });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

router.get('/:id', jwtVerify, async (req, res) => {
    try {
        const bookByid = await book.findById({ _id: req.params.id, isActive: true });
        if (!bookByid) return res.status(404).json({ message: 'Book not found' });
        res.json(bookByid);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
});

router.post('/', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('publishedDate').isISO8601().withMessage('Invalid date format'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
], jwtVerify, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, author, genre, publishedDate, price } = req.body;
    try {
        const newBook = new book({ title, author, genre, publishedDate, price });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error });
    }
});

router.put('/:id', jwtVerify, async (req, res) => {
    try {
        const updatedBook = await book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error });
    }
});

router.delete('/:id', jwtVerify, async (req, res) => {
    try {
        const updatedBook = await book.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book marked as inactive successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;