import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import authService from '../../services/authService';

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await authService.logout();
      localStorage.removeItem('token'); // Remove the token from local storage
      navigate('/login'); 
       window.location.reload(); // Refresh the page

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {username && (
              <NavDropdown
                title={
                  <>
                    <FaUser style={{ marginRight: '5px' }} />
                    {username}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
