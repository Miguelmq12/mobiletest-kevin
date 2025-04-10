import React, { useState, useEffect } from 'react';
import './confirm-text.css';
import { useNavigate } from 'react-router-dom';
import BottomActions from '../shared/bottom-actions/bottom-actions';
import ContentBox from '../shared/content-box/content-box';
import SignatureTabs from '../shared/tabs-signature/tabs-signature';
import getHtmlContent from '../../template-html/html-content';
import FirmComponent from '../shared/firm-component/firm.component';
import InfoUser from '../shared/infor-user/info-user';



const SignatureV2: React.FC = () => {
  const navigate = useNavigate();
  const [idTask, setIdTask] = useState<number | null>(0);
  const [idTipoFirma, setIdTipoFirma] = useState<number | null>(null);
  const [valorFirma, setValorFirma] = useState<string | null>(null);
  const [tittle, setTittle] = useState('');

  useEffect(() => {
    const storedIdTipoFirma = localStorage.getItem('idTipoFirma');
    const storedValorFirma = localStorage.getItem('valorFirma');
    const storeIdTask = localStorage.getItem('idTask');
    const storeTittle = localStorage.getItem('tittleTemp');

    if (storedIdTipoFirma) setIdTipoFirma(parseInt(storedIdTipoFirma));
    if (storedValorFirma) setValorFirma(storedValorFirma);
    if (storeIdTask) setIdTask(parseInt(storeIdTask));
    if (storeTittle) setTittle(storeTittle);

  }, []);

  const getContentBoxContent = () => {
    return getHtmlContent(idTask!);
  };

  const handleTabChange = (tabId: number) => {
    setIdTipoFirma(tabId);
  };
  
  const handleSignatureChange = (signatureData: string) => {
    setValorFirma(signatureData);
  };

  const handleSaveSignature = () => {
    // if (idTask === '10') {
    //   if (idTipoFirma && valorFirma) {
    //     localStorage.setItem('idTipoFirma', idTipoFirma.toString());
    //     localStorage.setItem('valorFirma', valorFirma);
    //     navigate('/progress-checklist');
    //   } else {
    //     alert('Please provide a signature.');
    //   }
    // } else {
    //   if (idTipoFirma && valorFirma) {
    //     alert('Signature saved (read-only).');
    //     navigate('/progress-checklist');
    //   } else {
    //     alert('No signature to save.');
    //   }
    // }
  };

  const handleSave= (): void => {

  };


  const handleClear = (): void => {
    localStorage.setItem('idTask','0');
    localStorage.setItem('tittleTemp','');
    navigate('/progress-checklist');
  };

  return (
    <div className="container-generic" style={{ marginBottom: '70px' }}>
      <h1 className="title">{tittle}</h1>
      <div className="divContextBox">
        <ContentBox content={getContentBoxContent()} />
      </div>

      {/* <SignatureTabs
        idTask={idTask!}
        idTipoFirma={idTipoFirma}
        valorFirma={valorFirma}
        onTabChange={handleTabChange}
        onSignatureChange={handleSignatureChange}
      /> */}

      <FirmComponent/>

      <InfoUser name="Stephen Jones" date="11/21/2024" />

      <div className="button-group">
        <BottomActions onExit={handleClear} onSubmit={handleSave} />
      </div>

      
    </div>
  );
};

export default SignatureV2;