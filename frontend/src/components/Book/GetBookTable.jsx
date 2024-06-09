import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container ,Modal } from 'react-bootstrap';
import {  FaEdit, FaTrash, FaInfo,  } from 'react-icons/fa';
import bookService from '../../services/bookService';

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  // const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await bookService.getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDeleteBook = async () => {
    if (bookToDelete && bookToDelete._id) {
      try {
        await bookService.deleteBook(bookToDelete._id);
        // Refetch the books after deletion
        const fetchedBooks = await bookService.getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
      setShowDeleteModal(false);
      setBookToDelete(null);
    } else {
      console.error('Book ID is undefined');
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <Container className="mt-5">
     
      <div className="book-table">
        <div className="book-row header">
          <div className="book-cell header mr-2">No</div>
          <div className="book-cell header mr-2">Title</div>
          <div className="book-cell header mr-2">Image</div>
          <div className="book-cell header mr-2">Author</div>
          <div className="book-cell header mr-2">Publish Year</div>
          <div className="book-cell header">Operations</div>
        </div>
        {books.map((book, index) => (
          <div className="book-row" key={book._id}>
            <div className="book-cell mb-2 rounded-left rounded-right">{index + 1}</div>
            <div className="book-cell mb-2 rounded-left rounded-right">{book.title}</div>
            <div className="book-cell mb-2 rounded-left rounded-right"><img src={book.coverPhoto} alt={book.title} style={{ width: '40px', height: 'auto' }} /></div>
            <div className="book-cell mb-2 rounded-left rounded-right">{book.author}</div>
            <div className="book-cell mb-2 rounded-left rounded-right">{book.publishedYear}</div>
            <div className="book-cell mb-2 rounded-left rounded-right">
              <Link to={`/book-details/${book._id}`} className="icon-link mr-3"><FaInfo style={{ color: 'blue', fontSize: '1.5em' }} /></Link>
              <Link to={`/edit-book/${book._id}`} className="icon-link mr-3"><FaEdit style={{ color: 'green', fontSize: '1.5em' }} /></Link>
              <button className="icon-link" onClick={() => handleDeleteBook(book)}><FaTrash style={{ color: 'red', fontSize: '1.5em' }} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for confirming book deletion */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteBook}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GetBooks;
