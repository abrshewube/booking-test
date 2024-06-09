import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { FaBook, FaUser, FaEye, FaEdit, FaTrash, FaInfo, FaTimes } from 'react-icons/fa';
import bookService from '../../services/bookService';

const Grbooks = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

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

  return (
    <Container className="mt-5">
    
      <Row xs={1} md={3} className="g-4">
        {books.map((book) => (
          <Col key={book._id}>
            <Card style={{ height: '100%' }}>
              <Card.Body style={{ position: 'relative', paddingBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaBook size={18} style={{ marginRight: '0.5rem', color: 'purple' }} />
                    <Card.Title style={{ marginBottom: 0 }}>{book.title}</Card.Title>
                  </div>
                  <div style={{
                    backgroundColor: 'purple',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                  }}>
                    {book.publishedYear}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <FaUser size={18} style={{ marginRight: '0.5rem', color: 'purple' }} />
                  <span style={{ color: 'gray' }}>{book.author}</span>
                </div>
                <Button variant="light" onClick={() => handleViewBook(book)} style={{ display: 'none' }}></Button>
              </Card.Body>
              <Card.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', marginTop: '1rem', borderTop: '1px solid #e0e0e0', position: 'relative' }}>
                <Link to="#" onClick={() => handleViewBook(book)} style={{ color: 'blue', textDecoration: 'none' }}><FaEye size={18} style={{ margin: '0 0.75rem' }} /></Link>
                <Link to={`/edit-book/${book._id}`} style={{ color: 'green', textDecoration: 'none' }}><FaEdit size={18} style={{ margin: '0 0.75rem' }} /></Link>
                <Link to="#" onClick={() => handleDeleteBook(book)} style={{ color: 'red', textDecoration: 'none' }}><FaTrash size={18} style={{ margin: '0 0.75rem' }} /></Link>
                <Link to={`/book-details/${book._id}`} style={{ color: 'gray', textDecoration: 'none' }}><FaInfo size={18} style={{ margin: '0 0.75rem' }} /></Link> {/* Navigate to details page */}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

     {/* Modal for displaying book details */}
<Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <div style={{ backgroundColor: 'pink', padding: '0.5rem' }}>
      <span style={{ color: 'purple', marginRight: '0.5rem' }}>{selectedBook && selectedBook.publishedYear}</span>
    </div>
    
  </Modal.Header>
  <Modal.Body>
  <Modal.Title>
      <FaBook size={24} style={{ marginRight: '0.5rem',marginBottom:'1rem', color: 'purple' }} />
      {selectedBook && selectedBook.title}
    </Modal.Title>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FaUser size={20} style={{ marginRight: '0.5rem', color: 'purple',marginBottoms:'1rem' }} />
      <h5>{selectedBook && selectedBook.author}</h5>
    </div>
    {selectedBook && (
      <img src={selectedBook.coverPhoto} alt={selectedBook.title} style={{ maxWidth: '50%', height: 'auto', marginBottom: '1rem' }} />
    )}
    <div>{selectedBook && selectedBook.description}</div>
    
  </Modal.Body>
  <Modal.Footer>
    <Button variant="purple" onClick={handleCloseModal}><FaTimes /> Close</Button>
  </Modal.Footer>
</Modal>

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

export default Grbooks;
