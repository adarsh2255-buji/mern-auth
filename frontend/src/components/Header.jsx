import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';




const Header = () => {

  const { userInfo } = useSelector((state) =>state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [logoutApiCall] = useSignoutMutation();

  const handleSignout = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Gym Mate</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            { userInfo ? (
              <>
              <NavDropdown title={userInfo.username} id='username'>
              <LinkContainer to='/'><NavDropdown.Item>Home</NavDropdown.Item></LinkContainer>
              <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
              <NavDropdown.Item onClick={ handleSignout }>Sign out</NavDropdown.Item>
              </NavDropdown>
              </>
            ) : (
              <>
              <LinkContainer to='/signin'><Nav.Link>Sign in</Nav.Link></LinkContainer>
              <LinkContainer to='/signup'><Nav.Link>Sign up</Nav.Link></LinkContainer>
              
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header

