import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {  FaArrowLeft} from 'react-icons/fa';
import bookService from '../../services/bookService';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    description: '',
    coverPhoto: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await bookService.getBookById(id);
        setFormData({
          title: book.title,
          author: book.author,
          publishedYear: book.publishedYear,
          description: book.description,
          coverPhoto: null // We won't prefill the file input
        });
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverPhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Input validation
      if (!formData.title || !formData.author || !formData.description) {
        setError('Please fill in all required fields');
        return;
      }

      const bookDataToSend = new FormData();
      bookDataToSend.append('title', formData.title);
      bookDataToSend.append('author', formData.author);
      bookDataToSend.append('publishedYear', formData.publishedYear);
      bookDataToSend.append('description', formData.description);
      if (formData.coverPhoto) {
        bookDataToSend.append('coverPhoto', formData.coverPhoto);
      }

      await bookService.updateBook(id, bookDataToSend);
      setSuccess('Book updated successfully');
      setTimeout(() => {
        navigate('/books');
      }, 3000);
    } catch (error) {
      setError('Error updating book');
      setTimeout(() => {
        setError('');
      }, 3000);
      console.error('Error updating book:', error);
    }
  };


  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#f8f9fa' }}>
          <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
        <FaArrowLeft /> Back
      </Button>
      <div className="row">
        <div className="col">
       
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card>
              <Card.Body>
              <h2 className="text-center mb-0 ml-2">Edit Book</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group controlId="formAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author" name="author" value={formData.author} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group controlId="formPublishedYear">
                    <Form.Label>Published Year</Form.Label>
                    <Form.Control type="text" placeholder="Enter published year" name="publishedYear" value={formData.publishedYear} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group controlId="formCoverPhoto">
                    <Form.Label>Cover Photo</Form.Label>
                    <Form.Control type="file" name="coverPhoto" onChange={handleFileChange} />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="btn-block">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
