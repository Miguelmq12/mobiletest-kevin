import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './core/oautContext';
import './App.css';

function App() {

  
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { session, login, logout } = authContext;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
     if (!tokenFromURL) {
      logout();
      navigate('/Login');
    } else if (tokenFromURL === "abc123xyz456") {
      const sessionData = {
        success: "",
        errorCode: "",
        errorMessage: "",
        data: {
          idUser: 1,
          name: "Kevin Sancho",
          jwtToken: "MASOINQ9MDOSIN01M0I9U2JSLKXM01"
        }
      };
      login(sessionData);
      navigate('/EmployeeInformationVerification');
    } else {
      logout();
      navigate('/token-validation-error');
    }
  }, []);


  return (
    <div className="App">
    </div>
  );
}

export default App;
