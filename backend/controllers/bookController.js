const Book = require('../models/Book');
const cloudinary = require('../services/cloudinary');

exports.createBook = async (req, res) => {
    const { title, author, publishedYear, description } = req.body;
    const { file } = req;

    try {
        console.log('Creating book:', title, author, publishedYear, description);
        
        const result = await cloudinary.uploader.upload(file.path, { folder: 'coverPhotos' });
        console.log('Uploaded cover photo:', result.secure_url);

        const book = new Book({
            title,
            author,
            publishedYear,
            description,
            coverPhoto: result.secure_url,
            user: req.user._id
        });

        await book.save();
        console.log('Book created:', book);
        
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        console.log('Getting books for user:', req.user._id);
        
        const books = await Book.find({ user: req.user._id });
        console.log('Books:', books);
        
        res.status(200).json(books);
    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        console.log('Getting book by ID:', req.params.id);
        
        const book = await Book.findById(req.params.id);
        console.log('Book:', book);
        
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        console.error('Error getting book by ID:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { title, author, publishedYear } = req.body;

    try {
        console.log('Updating book:', req.params.id);
        
        const book = await Book.findById(req.params.id);
        console.log('Existing book:', book);
        
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (req.file) {
            await cloudinary.uploader.destroy(book.coverPhoto);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'coverPhotos' });
            console.log('Uploaded new cover photo:', result.secure_url);
            book.coverPhoto = result.secure_url;
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.publishedYear = publishedYear || book.publishedYear;

        await book.save();
        console.log('Updated book:', book);
        
        res.status(200).json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        console.log('Deleting book:', req.params.id);
        
        const book = await Book.findById(req.params.id);
        console.log('Book to delete:', book);
        
        if (!book || book.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await cloudinary.uploader.destroy(book.coverPhoto);
        await Book.deleteOne({ _id: req.params.id });
        
        console.log('Book deleted:', book);
        
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: error.message });
    }
};
