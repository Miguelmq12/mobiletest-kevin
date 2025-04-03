import React, { useState } from 'react';
import './firm.component.css';

const FirmComponent = () => {
  const [signatureData, setSignatureData] = useState(localStorage.getItem('base64test'));
  const [message, setMessage] = useState('Click to Add Digital Signature');
  const [showImage, setShowImage] = useState(false);

  const handleClick = () => {
    if (signatureData) {
      setShowImage(true);
      setMessage('');
    } else {
      setMessage('Signature not saved, please go to digital signature');
    }
  };

  return (
    <div id="divimgCon">
      {!showImage && (
        <div id="signatureDiv" onClick={handleClick}>
          <span id="signatureText">{message}</span>
        </div>
      )}
      {showImage && signatureData && (
        <img id="signatureImage" src={signatureData} alt="Digital Signature" />
      )}
    </div>
  );
};

export default FirmComponent;
