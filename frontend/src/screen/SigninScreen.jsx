import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useSigninMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



const SigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const [signin, {isLoading}] = useSigninMutation()
    const { userInfo } = useSelector((state) =>state.user);

    useEffect(() =>{
      if(userInfo){
        navigate('/');  
      }
    }, [navigate, userInfo])
   


    const submitHandler = async(e) => {
        e.preventDefault();
        try {
          const res = await signin({ email, password }).unwrap();
          dispatch(setCredentials({...res}));
          navigate('/');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          
        }
        
    }
  return (
    <FormContainer>
      <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
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
          <Button disabled={isLoading} variant="primary" type="submit" className='mt-3'>
            Sign In
          </Button>
          </Form>
          {isLoading && <Loader/>}
          <Row className='py-3'>
            <Col>
              New to gym mate? <Link to='/signup' className='text-decoration-none'>click here</Link>
            </Col>
          </Row>
        
    </FormContainer>
  )
}

export default SigninScreen