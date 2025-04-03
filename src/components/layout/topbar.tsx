import React, { useEffect, useState } from 'react'; 
import reliableImage from '../../assets/images/reliable.png';
import reliableImageIcon from '../../assets/images/reliable-icon.png';
import { FaSignOutAlt } from 'react-icons/fa';
import './layout.css';

interface TopBarProps {
  title: string;  
}

const TopBar: React.FC<TopBarProps> = ({ title }) => { 
  const [showUserMenu, setShowUserMenu] = useState(false); 
  const [userName] = useState("Kevin"); 

    const [tittleShow, setTittle] = useState('');
  
  useEffect(() => {
      const storeIdTask = localStorage.getItem('idTask');
      const storeTittle = localStorage.getItem('tittleTemp');
      if(storeIdTask=='2'||storeIdTask=='5'||storeIdTask=='9') title =storeTittle!;
      setTittle(title);
  }, [title]);
  


  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#4472C4', color: 'white', borderBottom: 'solid 1.5px #868686', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      <img src={reliableImage} alt="Logo" className="login-logo-topbar" />
      <img src={reliableImageIcon} alt="Logo" className="login-logo-topbar-icon" />
      <h1 className='title-phone'>{tittleShow}</h1>
      <div style={{ position: 'relative' }}>
        <FaSignOutAlt  
          style={{ fontSize: '24px', cursor: 'pointer' }} 
          onClick={toggleUserMenu} 
        />

        {showUserMenu && (
          <div className="user-menu" style={{ position: 'absolute', right: 0, top: '30px', backgroundColor: 'white', color: '#000', padding: '10px', borderRadius: '5px', width: '200px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <p>{userName}</p>
            <button onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px', width: '100%' }}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
