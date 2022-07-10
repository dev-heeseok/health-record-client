import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MEMBER, ADMIN } from './hooks/useUser';
import { consoleError, consoleInfo } from './hooks/useLogger';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Missing from './components/Missing';
import useAuth from './hooks/useAuth';
import axios from './api/axios';

function App() {
  const { auth, setAuth } = useAuth();

  // useEffect(() => {
  //   consoleInfo("App useEffect");

  //   const validateAuth = async () => {

  //     try {
  //       await axios.get("/api/users/auth", {
  //         withCredentials: true
  //       });
  //     } catch (err) {
  //       consoleError(err);
  //     }
  //   }

  //   validateAuth();

  // }, [auth, setAuth]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/** public routes */}
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />

        {/** private routes */}
        <Route element={<RequireAuth allowedRoles={[MEMBER, ADMIN]} />} >
          <Route path='/' element={<Home />} />
        </Route>

        {/** catch all */}
        <Route path='*' element={<Missing />} />

      </Route>
    </Routes >
  );
}

export default App;
