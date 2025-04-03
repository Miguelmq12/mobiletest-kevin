import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; 
import RoutesComponent from './routes'; 
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './core/oautContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <AuthProvider> 
      <Router>
        <RoutesComponent /> 
      </Router>
    </AuthProvider>
  // </React.StrictMode>
);

reportWebVitals();
