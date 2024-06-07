const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/', authenticate, upload.single('coverPhoto'), createBook);
router.get('/', authenticate, getBooks);
router.get('/:id', authenticate, getBookById);
router.put('/:id', authenticate, upload.single('coverPhoto'), updateBook);
router.delete('/:id', authenticate, deleteBook);

module.exports = router;
