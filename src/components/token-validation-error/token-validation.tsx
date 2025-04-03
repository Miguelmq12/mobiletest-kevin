import React from 'react';
import './token-validation.css';
import reliableImage from '../../assets/images/reliable.png';

const TokenValidationError = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <img src={reliableImage} alt="Logo" className="error-logo" />
        <h2>Token Validation Failed</h2>
        <p className="error-message">
          The token provided is invalid or expired. Please try again or contact support.
        </p>
      </div>
    </div>
  );
}

export default TokenValidationError;
