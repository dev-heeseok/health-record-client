import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import consoleDebug from './hooks/useLogging'
import Layout from './components/Layout';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Missing from './components/Missing';

function App() {
  consoleDebug('App is rendered ...');

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/** public routes */}
        <Route path='/' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />

        {/** private routes */}

        {/** catch all */}
        <Route path='*' element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
