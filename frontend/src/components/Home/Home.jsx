import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Row className="mb-3">
        <Col>
          <Button variant="light" style={{ backgroundColor: 'skyblue', marginRight: '10px' }}>Card</Button>
          <Button variant="light" style={{ backgroundColor: 'skyblue' }}>Table</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <h1 style={{ textAlign: 'left' }}>Book List</h1>
        </Col>
        <Col xs={6} style={{ textAlign: 'right' }}>
          <Button variant="primary">
            <FaPlus style={{ marginRight: '5px' }} />
            {/* Add */}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
