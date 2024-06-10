import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../../services/authService';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Container, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VerifyAccount = () => {
    const { token } = useParams(); // Extract token from URL using useParams
    const [verificationStatus, setVerificationStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // Make request to backend API to verify the token
                const response = await authService.verifyAccount(token);
                setVerificationStatus(response);
            } catch (error) {
                setVerificationStatus(error.message);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px', textAlign: 'center' }}>
                <Card.Title className="mb-4">Verification Status</Card.Title>
                {loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <div>
                        {verificationStatus === 'Email verified successfully' ? (
                            <div>
                                <FaCheckCircle size={50} color="green" />
                                <h3 className="mt-3 text-success">Your account has been verified!</h3>
                                <Link to="/login" className="btn btn-primary mt-3">Go to Login</Link>
                            </div>
                        ) : (
                            <div>
                                <FaTimesCircle size={50} color="red" />
                                <h3 className="mt-3 text-danger">{verificationStatus}</h3>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default VerifyAccount;
