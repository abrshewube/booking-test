import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const BooksLayout = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-3" style={{ justifyContent: 'center' }}>
        <Col style={{ textAlign: 'center' }}>
          <Link to="/books/card">
            <Button variant="light" style={{ backgroundColor: 'skyblue', marginRight: '10px' }}>Card</Button>
          </Link>
          <Link to="/books">
            <Button variant="light" style={{ backgroundColor: 'skyblue' }}>Table</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <h1 style={{ textAlign: 'left' }}>Book List</h1>
        </Col>
        <Col xs={6} style={{ textAlign: 'right' }}>
          <Link to="/create-book">
            <Button variant="primary">
              <FaPlus style={{ marginRight: '5px' }} />
              Add
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default BooksLayout;
