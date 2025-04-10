import React, { useState } from 'react';
import './i9.css';
import { useNavigate } from 'react-router-dom';
import BottomActions from '../shared/bottom-actions/bottom-actions';
import { FaCaretDown, FaCaretUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const I9: React.FC = () => {
  const [pasoActivo, setPasoActivo] = useState<number | null>(0);
  const navigate = useNavigate();

  const pasos = [
    {
      titulo: 'Step 1: ',
      contenido: (
        <div className="acordeon-contenido">
          <div className="step1-inputs">
            <div className="input-group">
              <label className="acordeon-label">First name and middle initial</label>
              <input type="text" className="acordeon-input" />
            </div>
            <div className="input-group">
              <label className="acordeon-label">Last name</label>
              <input type="text" className="acordeon-input" />
            </div>
            <div className="input-group">
              <label className="acordeon-label">Social security number</label>
              <input type="text" className="acordeon-input" />
            </div>
            <div className="input-group">
              <label className="acordeon-label">Address</label>
              <input type="text" className="acordeon-input" />
            </div>
            <div className="input-group">
              <label className="acordeon-label">City or town, state, and ZIP code</label>
              <input type="text" className="acordeon-input" />
            </div>
          </div>
        </div>
      ),
    },
    {
      titulo: 'Step 2: ',
      contenido: (
        <div className="acordeon-contenido">
            <div className="step1-inputs">
              <div className="input-group">
                <label className="acordeon-label">Address (Street Number and Name) </label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">  City or Town </label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">State</label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">ZIP Code</label>
                <input type="text" className="acordeon-input" />
              </div>
            </div>
        </div>
      ),
    },
    {
      titulo: 'Step 3: ',
      contenido: (
        <div className="acordeon-contenido">
            <div className="step1-inputs">
              <div className="input-group">
                <label className="acordeon-label">Date of Birth (mm/dd/yyyy) </label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">U.S. Social Security Number</label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">Employee's E-mail Address</label>
                <input type="text" className="acordeon-input" />
              </div>
              <div className="input-group">
                <label className="acordeon-label">Employee's Telephone Number</label>
                <input type="text" className="acordeon-input" />
              </div>
            </div>
        </div>
      ),
    },
    {
      titulo: 'Step 4: ',
      contenido: (
        <div className="acordeon-contenido">
          <label style={{  display: 'flex',padding: '8px',textAlign:'left'}} >Check one of the following boxes to attest to your citizenship or immigration status (See page 2 and 3 of the instructions):</label>
          <table style={{ width: '100%'}}>
          <tbody>
            <tr>
              <td style={{  textAlign: 'left', padding: '8px', width: '2%' }} >
                  <input
                    type="checkbox"
                    id="step1-checkbox1"
                    className="acordeon-checkbox"
                  />
              </td>
              <td style={{ padding: '8px', width: '98%',textAlign: 'left' }}>
              1. A citizen of the United States
              </td>
            </tr>
            <tr>
              <td style={{  textAlign: 'left', padding: '8px', width: '2%' }}>
                  <input
                    type="checkbox"
                    id="step1-checkbox2"
                    className="acordeon-checkbox"
                  />
              </td>
              <td style={{ padding: '8px', width: '98%',textAlign: 'left' }}>
              2. A noncitizen national of the United States (See Instructions.)
              </td>
            </tr>
            <tr>
              <td style={{  textAlign: 'left', padding: '8px', width: '2%' }}>
                  <input
                    type="checkbox"
                    id="step1-checkbox3"
                    className="acordeon-checkbox"
                  />
              </td>
              <td style={{ padding: '8px', width: '98%',textAlign: 'left' }}>
              3. A lawful permanent resident1 (Enter USCIS or A-Number.)
              </td>
            </tr>
            <tr>
              <td style={{  textAlign: 'left', padding: '8px', width: '2%' }}>
                  <input
                    type="checkbox"
                    id="step1-checkbox3"
                    className="acordeon-checkbox"
                  />
              </td>
              <td style={{ padding: '8px', width: '98%',textAlign: 'left' }}>
              4. An alien authorized to work until 
              </td>
            </tr>
          </tbody>
          </table>
          <label style={{  display: 'flex',padding: '8px',textAlign:'left'}} >If you check Item Number 4., enter one of these:</label>

          <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td className="input-box">
                <label className="box-label">USCIS A-Number</label>
                <input type="text" className="acordeon-input-table"/>
              </td>
              <td className="or-text">OR</td>
              <td className="input-box">
                <label className="box-label">Form I-94 Admission Number</label>
                <input type="text" className="acordeon-input-table"/>
              </td>
              <td className="or-text">OR</td>
              <td className="input-box">
                <label className="box-label">Foreign Passport Number and Country of Issuance</label>
                <input type="text" className="acordeon-input-table"/>
              </td>
            </tr>
          </table>
        </div>
        </div>
      ),
    },
  ];

  const togglePaso = (index: number) => {
    setPasoActivo(pasoActivo === index ? null : index);
  };

  const handleClear = (): void => {
    navigate('/progress-checklist');
  };

  const handleSaveSignature = (): void => {
  };

  return (
    <div className="container-generic" style={{ marginBottom: '70px' }}>
      <h1 className="title">I-9 Employment Eligibility</h1>

      <div className="acordeon-contenedor">
        {pasos.map((paso, index) => (
          <div key={index} className="acordeon-paso">
            <div
              className="acordeon-titulo"
              onClick={() => togglePaso(index)}
              aria-expanded={pasoActivo === index ? 'true' : 'false'}
              aria-controls={`paso-${index}`}
            >
              <span>{paso.titulo}</span>
              <span>
                {pasoActivo === index ? (
                  <FaChevronUp size={20} /> 
                ) : (
                  <FaChevronDown size={20} /> 
                )}
              </span>
            </div>
            <div
              id={`paso-${index}`}
              className={`acordeon-contenido-wrapper ${pasoActivo === index ? 'open' : ''}`}
            >
              {pasoActivo === index && paso.contenido}
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <BottomActions onExit={handleClear} onSubmit={handleSaveSignature} />
      </div>
    </div>
  );
};

export default I9;
