import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const {userInfo} = useSelector((state) => state.user);
    return userInfo ? <Outlet/> : <Navigate to='/signin' replace/>
}

export default PrivateRoute