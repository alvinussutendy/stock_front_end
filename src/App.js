import React, { Component, useState } from 'react';
import './App.css';
// import routes from './data/routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Dashboard from './components/dashboard';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken(); //state for the token in storage, is exists or not

  //call if the token isn't exists
  if(!token){
    return (
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element=<SignIn setToken={setToken}/>
            exact= {true}
            name= 'SignIn'
          />
          <Route 
            path='/signup' 
            element=<SignUp setToken={setToken}/>
            exact= {true}
            name= 'SignUp'
          />
        </Routes>
      </BrowserRouter>
    )
  }

  //call if the token is exists
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element=<Dashboard setToken={setToken}/>
          exact= {true}
          name= 'Dashboard'
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
