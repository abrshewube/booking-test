const Book = require('../models/Book');
const cloudinary = require('../services/cloudinary');

exports.createBook = async (req, res) => {
    const { title, author, publishedYear } = req.body;
    const { file } = req;

    try {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'coverPhotos' });

        const book = new Book({
            title,
            author,
            publishedYear,
            coverPhoto: result.secure_url,
            user: req.user._id
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { title, author, publishedYear } = req.body;

    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (req.file) {
            await cloudinary.uploader.destroy(book.coverPhoto);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'coverPhotos' });
            book.coverPhoto = result.secure_url;
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.publishedYear = publishedYear || book.publishedYear;

        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await cloudinary.uploader.destroy(book.coverPhoto);
        await Book.deleteOne({ _id: req.params.id }); // Use deleteOne to remove the book from the database

        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
