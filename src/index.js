import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element = {<App />} />
        </Routes>
      </BrowserRouter>    
    </AuthProvider>
  </React.StrictMode>
);


