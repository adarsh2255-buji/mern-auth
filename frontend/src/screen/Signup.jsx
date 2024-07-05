import React, { useEffect } from 'react'
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
import Loader from '../components/Loader'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector((state) => state.user);

    const [signup, {isLoading}] = useSignupMutation()

    useEffect(()=>{
      if(userInfo){
        navigate('/');  
      }
    }, [navigate, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
          const res = await signup({username, email, password}).unwrap();
          dispatch(setCredentials({ ...res}));
          navigate('/');
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
    }
  return (
    <>
     <FormContainer>
      <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicUsername" className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className='my-2'>
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-3'>
            Sign Up
          </Button>
          {isLoading && <Loader />}
          </Form>
          <Row className='py-3'>
            <Col>
              Already have account? <Link to='/signin' className='text-decoration-none'>click here</Link>
            </Col>
          </Row>
        
    </FormContainer>
    </>
  )
}

export default Signup