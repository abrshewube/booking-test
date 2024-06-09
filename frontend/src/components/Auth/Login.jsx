import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const token = await authService.login(formData);
            console.log('Login successful! Token:', token);
            localStorage.setItem('token', token); // Store the token in localStorage
            navigate('/'); // Redirect to the home page
            window.location.reload(); // Refresh the page

        } catch (error) {
            if (error && error.error) {
                setError(error.error); // Display the error message from the server
            } else {
                setError('An unexpected error occurred. Please try again.'); // Default error message
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Title className="text-center mb-4">Welcome Back</Card.Title>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <div className="input-group mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <span className="input-group-text"><RiUserLine /></span>
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <span className="input-group-text"><RiLockPasswordLine /></span>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </div>
                    </Form.Group>

                    {error && <Alert variant="danger" className="text-center mb-3">{error}</Alert>}

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <span>Don&apos;t have an account? </span>
                    <Link to="/register">Register</Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginForm;
