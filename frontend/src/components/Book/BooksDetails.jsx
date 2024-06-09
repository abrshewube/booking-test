import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import bookService from '../../services/bookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await bookService.getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <Container className="mt-5">
      <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
        <FaArrowLeft /> Back
      </Button>
      {book && (
        <Card className="shadow-lg"> {/* Add shadow-lg class for more shadow */}
          <div className="d-flex">
            {book.coverPhoto && (
              <Card.Img src={book.coverPhoto} alt={book.title} style={{ width: '200px', height: 'auto' }} />
            )}
            <div className="flex-grow-1">
              <Card.Header as="h5">{book.title}</Card.Header>
              <Card.Body>
                <Card.Text><strong>ID:</strong> {book._id}</Card.Text>
                <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                <Card.Text><strong>Published Year:</strong> {book.publishedYear}</Card.Text>
                <Card.Text><strong>Description:</strong> {book.description}</Card.Text>
                <Card.Text><strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}</Card.Text>
                <Card.Text><strong>Updated At:</strong> {new Date(book.updatedAt).toLocaleString()}</Card.Text>
              </Card.Body>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default BookDetails;
