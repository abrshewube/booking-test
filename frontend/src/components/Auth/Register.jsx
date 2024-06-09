import { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { RiLockPasswordLine, RiUserLine, RiMailLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await authService.register(formData);
            setMessage(response);
            setError('');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            setError(error.error || 'An error occurred during registration');
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Title className="text-center mb-4">Register</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <InputGroup.Text><RiUserLine /></InputGroup.Text>
                        </InputGroup>
                        {error && !formData.username && <div className="text-danger">Username is required</div>}
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputGroup.Text><RiMailLine /></InputGroup.Text>
                        </InputGroup>
                        {error && !formData.email && <div className="text-danger">Email is required</div>}
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </InputGroup.Text>
                        </InputGroup>
                        {error && !formData.password && <div className="text-danger">Password is required</div>}
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </InputGroup.Text>
                        </InputGroup>
                        {error && !formData.confirmPassword && <div className="text-danger">Confirm Password is required</div>}
                    </Form.Group>

                    {/* {error && <div className="text-danger text-center mb-3">{error}</div>} */}
                    {message && <div className="text-success text-center mb-3">{message}</div>}

                    <Button variant="primary" type="submit" className="w-100">
                        Register
                    </Button>

                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegistrationForm;
