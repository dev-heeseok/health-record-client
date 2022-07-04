import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import consoleDebug, { RENDER } from './hooks/useLogging';
import { GUEST, MEMBER, ADMIN } from './hooks/useUser';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Missing from './components/Missing';

function App() {
  consoleDebug('App is rendered ...', RENDER);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/** public routes */}
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />

        {/** private routes */}
        <Route element={<RequireAuth />} allowedRoles={[MEMBER, ADMIN]}>
          <Route path='/' element={<Home />} />
        </Route>

        {/** catch all */}
        <Route path='*' element={<Missing />} />

      </Route>
    </Routes >
  );
}

export default App;
