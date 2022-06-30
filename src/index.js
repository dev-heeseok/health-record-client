import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </AuthProvider>
  </CookiesProvider>
);
