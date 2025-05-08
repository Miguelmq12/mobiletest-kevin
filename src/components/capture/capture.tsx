// import React from 'react';
// import Webcam from 'react-webcam';

// interface CaptureProps {
//   onCapture: (imageSrc: string) => void;
//   onClose: () => void;
// }

// const Capture: React.FC<CaptureProps> = ({ onCapture, onClose }) => {
//   const webcamRef = React.useRef<Webcam | null>(null); // Tipando la referencia al componente Webcam

//   const capture = React.useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         onCapture(imageSrc); // Llamamos a onCapture pasando la imagen
//       }
//     }
//   }, [webcamRef, onCapture]);

//   return (
//     <div className="camera-container">
//       <button onClick={onClose} className="back-button">←</button>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width="100%"
//         videoConstraints={{ facingMode: "user" }}
//       />
//       <div className="button-group">
//         <button className="button" onClick={capture}>Capturar Imagen</button>
//       </div>

//       <p>INSTRUCTIONS</p>
//       <p>Take a headshot with a plain, light-colored background and even lighting to avoid shadows or bright spots. Wear business casual attire without logos or patterns, and ensure no glare if wearing glasses.</p>
//     </div>
//   );
// }

// export default Capture;



import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaSyncAlt } from 'react-icons/fa'; // Importa un icono para el botón de cambio de cámara
interface CaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const Capture: React.FC<CaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // 'user' es frontal, 'environment' es trasera

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [webcamRef, onCapture]);

  const switchCamera = useCallback(() => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  }, [setFacingMode]);

  return (


    <div className="camera-container">
    <button onClick={onClose} className="back-button">←</button>
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width="100%"
      videoConstraints={{ facingMode: facingMode }}
    />
    <div className="button-group">
      <button className="button" onClick={capture}>Capturar Imagen</button>
      <button  onClick={switchCamera}>
          <FaSyncAlt /> 
        </button>
    </div>

    <p>INSTRUCTIONS</p>
    <p>Take a headshot with a plain, light-colored background and even lighting to avoid shadows or bright spots. Wear business casual attire without logos or patterns, and ensure no glare if wearing glasses.</p>
  </div>

  );
};

export default Capture;