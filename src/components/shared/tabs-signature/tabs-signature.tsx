import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { FaHandPointer, FaSignature } from 'react-icons/fa';

interface SignatureTabsProps {
  idTask: number;
  idTipoFirma: number | null;
  valorFirma: string | null;
  onTabChange: (tabId: number) => void;
  onSignatureChange: (signatureData: string) => void;
}

const SignatureTabs: React.FC<SignatureTabsProps> = ({ idTask, idTipoFirma, valorFirma, onTabChange, onSignatureChange }) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'type'>('draw');
  const [fullName, setFullName] = useState<string>('');
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [showFloatingIcon, setShowFloatingIcon] = useState<boolean>(true);

  useEffect(() => {
    if (idTask !== 10) {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }

    if (idTipoFirma) {
      setActiveTab(idTipoFirma === 1 ? 'draw' : 'type');
    }

    if (valorFirma) {
      setSignatureImage(valorFirma);
    }
  }, [idTask, idTipoFirma, valorFirma]);

  useEffect(() => {
    if (activeTab === 'draw') {
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
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'draw') {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [activeTab]);

  const draw = (e: MouseEvent | TouchEvent) => {
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

  const handleTouchStart = (e: TouchEvent) => {
    if (isReadOnly) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
      setDrawing(true);
      setShowFloatingIcon(false);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (drawing) {
      draw(e);
    }
  };

  const handleTouchEnd = () => {
    setDrawing(false);
    if (canvasRef.current) {
      onSignatureChange(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (isReadOnly) return;
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    ctxRef.current?.beginPath();
    if (rect) {
      ctxRef.current?.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    setDrawing(true);
    setShowFloatingIcon(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    draw(e);
  };

  const handleMouseUp = () => {
    setDrawing(false);
    if (canvasRef.current) {
      onSignatureChange(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleTabClick = (tabName: 'draw' | 'type') => {
    if (!isReadOnly) {
      setActiveTab(tabName);
      onTabChange(tabName === 'draw' ? 1 : 2);
      setShowFloatingIcon(true); 
    }
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    onSignatureChange(e.target.value);
  };

  return (
    <div className="upload-container">
      <div className="tab-header">
        <button
          className={`tab ${activeTab === 'draw' ? 'active' : ''}`}
          onClick={() => handleTabClick('draw')}
          // disabled={isReadOnly}
        >
          Draw Signature
        </button>
        <button
          className={`tab ${activeTab === 'type' ? 'active' : ''}`}
          onClick={() => handleTabClick('type')}
          // disabled={isReadOnly}
        >
          Type Full Name
        </button>
      </div>

      <div className="upload-box">
        {activeTab === 'type' ? (
          <>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Enter your full name"
              autoComplete="off"
              style={{ padding: '5px', fontSize: '1em' }}
              readOnly={isReadOnly}
            />
            {signatureImage && <img src={signatureImage} alt="Typed Signature" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
            {!signatureImage && <div
              style={{
                fontFamily: 'Dancing Script',
                fontSize: '35px',
                marginTop: '20px',
                color: '#000',
              }}
            >
              {fullName}
            </div>}
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
            {signatureImage && <img src={signatureImage} alt="Drawn Signature" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureTabs;