import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store.js';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen.jsx';
import SigninScreen from './screen/SigninScreen.jsx';
import Signup from './screen/Signup.jsx';
import { Provider } from 'react-redux';
import ProfileScreen from './screen/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<App />}>
      <Route index={true} path='/' element ={<HomeScreen />}/>
      <Route  path='/signin' element ={<SigninScreen />}/>
      <Route  path='/signup' element ={<Signup />}/>
      {/* Private route */}
      <Route  path='/' element ={<PrivateRoute />}>
       <Route  path='/profile' element ={<ProfileScreen />}/>
      </Route>
      
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>
  </Provider>
)
