import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
  TouchEvent,
} from 'react';
import './digital-signature.css';
import { useNavigate } from 'react-router-dom';
import { FaHandPointer, FaPen, FaRegEdit, FaSignature } from 'react-icons/fa';  // Ícono de un dedo apuntando
import BottomActions from '../shared/bottom-actions/bottom-actions';
import ContentBox from '../shared/content-box/content-box';

type SignatureType = 'draw' | 'type';

const Signature: React.FC = () => {
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [font, setFont] = useState<string>('Dancing Script');
  const [signatureType, setSignatureType] = useState<SignatureType>('draw');
  const [fullName, setFullName] = useState<string>('');
  const [showFloatingIcon, setShowFloatingIcon] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        if (ctx) {
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.strokeStyle = '#000';
        }
      }
    }
  }, [signatureType]);

  useEffect(() => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [signatureType]);

  const draw = (e: MouseEvent | TouchEvent): void => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleTouchStart = (e: TouchEvent): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(
        touch.clientX - rect.left,
        touch.clientY - rect.top
      );
      setDrawing(true);
      setShowFloatingIcon(false);  // Ocultar el icono flotante cuando el usuario toque el canvas
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (drawing) {
      draw(e);
    }
  };

  const handleTouchEnd = (): void => {
    setDrawing(false);
  };

  const handleMouseDown = (e: MouseEvent): void => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    ctxRef.current?.beginPath();
    if (rect) {
      ctxRef.current?.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    setDrawing(true);
    setShowFloatingIcon(false);  // Ocultar el icono flotante al hacer click
  };

  const handleMouseMove = (e: MouseEvent): void => {
    draw(e);
  };

  const handleMouseUp = (): void => {
    setDrawing(false);
  };

  const handleClear = (): void => {
    navigate('/progress-checklist');
  };

  const handleSaveSignature = (): void => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const signatureData = canvas.toDataURL('image/png');
        console.log('Signature data (base64):', signatureData);
        localStorage.setItem("base64test",signatureData);
      }
    } else if (signatureType === 'type') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = `48px ${font}`;
        canvas.width = ctx.measureText(fullName).width;
        canvas.height = 60;
        ctx.fillText(fullName, 0, 50);
        const signatureData = canvas.toDataURL('image/png');
        console.log('Typed Signature data (base64):', signatureData);
        localStorage.setItem("base64test",signatureData);
      }
    }
  };

  const [activeTab2, setActiveTab2] = useState('draw');
  const handleTabClick = (tabName: any) => {
    setActiveTab2(tabName);
    setSignatureType(tabName);
    setShowFloatingIcon(true);
  };

  return (
    <div className="container-generic" style={{ marginBottom: '70px' }}>
      <h1 className="title">Digital Signature</h1>

      <div className='divContextBox'  >
        <ContentBox content={
          <>
            <p>
              By signing below, I voluntarily agree to use a digital signature to complete my new hire paperwork online. I understand that my digital signature will be legally binding and have the same validity as a handwritten signature.
            </p>
            <p>
              I acknowledge that:
            </p>
            <ul>
              <li>The documents I sign will be stored electronically.</li>
              <li>The company will take steps to protect my information.</li>
              <li>I can withdraw my consent at any time, but it may delay the hiring process.</li>
            </ul>
          </>
        } />
      </div>


      <div className="upload-container">
        <div className="tab-header">
          <button
            className={`tab ${activeTab2 === 'draw' ? 'active' : ''}`}
            onClick={() => handleTabClick('draw')}
          >
            Draw Signature
          </button>
          <button
            className={`tab ${activeTab2 === 'type' ? 'active' : ''}`}
            onClick={() => handleTabClick('type')}
          >
            Type Full Name
          </button>
        </div>


        <div className="upload-box">
          {activeTab2 === 'type' ? (
            <>
              <input
                type="text"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="off"
                style={{ padding: '5px', fontSize: '1em' }}
              />
              <div
                style={{
                  fontFamily: font,
                  fontSize: '35px',
                  marginTop: '20px',
                  color: '#000',
                }}
              >
                {fullName}
              </div>
            </>
          ) : (
            <div className="canvas-container" style={{ position: 'relative' }}>
              {showFloatingIcon && (
                <div className="floating-icon" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}>
                  <div className="floating-icon-anim">
                    <FaSignature size={60} color="#000" />
                    <FaHandPointer size={60} color="#3367D6" />
                  </div>
                  <p>Tap here to draw your signature</p>
                </div>
              )}
              <canvas
                ref={canvasRef}
                width={800}
                height={300}
                style={{
                  border: '1px solid white',
                  marginTop: '20px',
                  touchAction: 'none',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <BottomActions onExit={handleClear} onSubmit={handleSaveSignature} />
      </div>

    </div>
  );
};

export default Signature;
