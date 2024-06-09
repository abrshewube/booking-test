import  { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    description: '',
    coverPhoto: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

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
      if (!formData.title || !formData.author || !formData.description || !formData.coverPhoto) {
        setError('Please fill in all fields');
        return;
      }

      const token = localStorage.getItem('token'); // Assuming you stored the token as 'token' in localStorage
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('publishedYear', formData.publishedYear);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('coverPhoto', formData.coverPhoto);
  
      const response = await axios.post('http://localhost:8080/api/books', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Book created successfully');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      console.log('Book created:', response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      setError('Error creating book');
      setTimeout(() => {
        setError('');
      }, 3000);
      console.error('Error creating book:', error.response.data);
      // Handle error, show error message to the user
    }
  };

  return (
    <div className="container mt-5">
        <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
        <FaArrowLeft /> Back
      </Button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create New Book</h2>
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
                  <Form.Control type="file" name="coverPhoto" onChange={handleFileChange} required />
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
  );
};

export default CreateBook;
