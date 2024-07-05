import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) =>state.user);

    const [updateProfile, {isLoading}] = useUpdateProfileMutation();

    useEffect(()=>{
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email]);

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
          const res = await updateProfile({ _id : userInfo._id,
            username,
            email,password
           }).unwrap();
          dispatch(setCredentials({...res}));
          toast.success("Profile updated successfully")
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <>
    <FormContainer>
    <h1>Update profile</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
        {isLoading && <Loader/>}
        </Form>

    </FormContainer>
    </>
  )
}

export default ProfileScreen