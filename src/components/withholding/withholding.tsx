import React, { useState } from 'react';
import './withholding.css';
import { useNavigate } from 'react-router-dom';
import BottomActions from '../shared/bottom-actions/bottom-actions';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Layout from '../layout/layout';

const WithHolding: React.FC = () => {
  const [pasoActivo, setPasoActivo] = useState<number | null>(0);
  const navigate = useNavigate();

  const pasos = [
    {
      titulo: 'Step 1: Enter Personal Information',
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
              Single or Married filing separately.
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
              Married filing jointly or Qualifying surviving spouse.
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
              Head of household (Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)
              </td>
            </tr>
          </tbody>
        </table>


      </div>
      ),
    },
    {
      titulo: 'Step 2: Multiple Jobs or Spouse Works',
      contenido: (
        <div className="acordeon-contenido">
              <table style={{ width: '100%'}}>
                <tbody>
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'left', padding: '8px', width: '100%' }}> 
                    Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse 
                    also works. The correct amount of withholding depends on income earned from all of these jobs.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'left', padding: '8px', width: '100%' }}> 
                    Do <strong> only one</strong> of the following.
                    </td>
                  </tr>

                  <tr>
                    <td style={{textAlign: 'left', padding: '8px', width: '2%' ,verticalAlign: 'top', fontWeight: 'bold'}}>
                      a)
                    </td>
                    <td style={{textAlign: 'left' ,padding: '8px', width: '98%' }}> 
                      Use the estimator at www.irs.gov/W4App for the most accurate withholding for this step (and Steps 3–4). If 
                      you or your spouse have self-employment income, use this option; or
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'left', padding: '8px', width: '2%',verticalAlign: 'top', fontWeight: 'bold' }}>
                      b)
                    </td>
                    <td style={{textAlign: 'left' ,padding: '8px', width: '98%' }}> 
                      Use the Multiple Jobs Worksheet on page 3 and enter the result in Step 4(c) below; or 
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'left', padding: '8px', width: '2%',verticalAlign: 'top', fontWeight: 'bold' }}>
                      c)
                    </td>
                    <td style={{textAlign: 'left' ,padding: '8px', width: '98%' }}> 
                      If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This 
                      option is generally more accurate than (b) if pay at the lower paying job is more than half of the pay at the 
                      higher paying job. Otherwise, (b) is more accurate 
                    </td>
                  </tr>
                </tbody>
              </table>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="step2-checkbox"
                    className="acordeon-checkbox"
                  />
                  <label htmlFor="step2-checkbox" className="acordeon-checkbox-label">
                    Confirm.
                  </label>
                </div>
        </div>
      ),
    },
    {
      titulo: 'Step 3: Claim Dependent and Other Credits',
      contenido: (
      <div className="acordeon-contenido step-3-container">
        <div className="step-3-item">
          <label htmlFor="incomeInfo">
            If your total income will be $200,000 or less ($400,000 or less if married filing jointly):
          </label>
        </div>

        <div className="step-3-item indented">
          <label htmlFor="childrenCredit">
            Multiply the number of qualifying children under age 17 by $2,000
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="childrenCredit" className="acordeon-input" />
          </div>
        </div>

        <div className="step-3-item indented">
          <label htmlFor="otherDependents">
            Multiply the number of other dependents by $500
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="otherDependents" className="acordeon-input" />
          </div>
        </div>

        <div className="step-3-item">
          <label htmlFor="totalCredits">
            Add the amounts above for qualifying children and other dependents. You may add to this the amount of any other credits. Enter the total here
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="totalCredits" className="acordeon-input" />
          </div>
        </div>
      </div>
      ),
    },
    {
      titulo: 'Step 4: Other Adjustments (optional)',
      contenido: (
      <div className="acordeon-contenido step-4-container">
        <div className="step-4-item">
          <label htmlFor="otherIncome">
            <strong>a)</strong> <strong>Other income (not from jobs).</strong>  If you want tax withheld for other income you 
                                expect this year that won’t have withholding, enter the amount of other income here. 
                                This may include interest, dividends, and retirement income...
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="otherIncome" className="acordeon-input" />
          </div>
        </div>

        <div className="step-4-item">
          <label htmlFor="deductions">
            <strong>b)</strong>  <strong>Deductions.</strong> If you expect to claim deductions other than the standard deduction and 
                                want to reduce your withholding, use the Deductions Worksheet on page 3 and enter 
                                the result here...
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="deductions" className="acordeon-input" />
          </div>
        </div>

        <div className="step-4-item">
          <label htmlFor="extraWithholding">
            <strong>c)</strong>  <strong>Extra withholding.</strong> Enter any additional tax you want withheld each <strong>pay period</strong>...
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input type="text" id="extraWithholding" className="acordeon-input" />
          </div>
        </div>
      </div>
      ),
    }
  ];

  const togglePaso = (index: number) => {
    setPasoActivo(pasoActivo === index ? null : index);
  };

  const handleExit = (): void => {
    navigate('/progress-checklist');
  };

  const handleSubmit = (): void => {
  };

  return (
    <Layout title="W-4 Withholding" onExit={handleExit} onSubmit={handleSubmit}>
          <div className="container-generic" style={{ marginBottom: '70px' }}>
      <h1 className="title">W-4 Withholding</h1>
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

    </div>
    </Layout>

  );
};

export default WithHolding;
