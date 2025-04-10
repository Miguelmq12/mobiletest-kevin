import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/login/login';
import LoginPhone from './components/login-phone/login-phone';
import Welcome from './components/welcome/welcome';
import LandingPage from './components/landing-page/landing-page';
import Signature from './components/digital-signature/digital.signature';
import PersonalInformation from './components/personal-information/personal-information';
import ConfirmText from './components/confirm-text/confirm-text';
import Capture from './components/capture/capture';
import { AuthContext } from './core/oautContext'; 
import TokenValidationError from './components/token-validation-error/token-validation';
import Layout from './components/layout/layout';
import WithHolding from './components/withholding/withholding';
import I9 from './components/i9/i9';

const RoutesComponent = () => {
  const authContext = useContext(AuthContext);
  const session = authContext?.session;
  const isAuthenticated = session !== null;
  
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/Login"
        element={!isAuthenticated ? <Login />  : <Navigate to="/" />}
      />
      <Route
        path="/EmployeeInformationVerification"
        element={isAuthenticated ? <LoginPhone /> : <Navigate to="/" />}
      />
      <Route
        path="/welcome"
        element={isAuthenticated ? <Welcome /> : <Navigate to="/" />}
      />
      <Route
        path="/progress-checklist"
        element={isAuthenticated ?  <Layout title="New Hire Checklist"><LandingPage /></Layout> : <Navigate to="/" />}
      />
      <Route
        path="/personal-information"
        element={isAuthenticated ? <Layout title="Personal Information"><PersonalInformation /></Layout> : <Navigate to="/" />}
      />
      <Route
        path="/digital-signature"
        element={isAuthenticated ? <Layout title="Digital Signature"><Signature/></Layout> :<Navigate to="/" />}
      />

      <Route
        path="/confirm"
        element={isAuthenticated ? <Layout title=''><ConfirmText/></Layout> :<Navigate to="/" />}
      />
      <Route
        path="/token-validation-error"
        element={!isAuthenticated ? <TokenValidationError /> : <Navigate to="/" />}
      />
      <Route
        path="/w4-withholding"
        element={isAuthenticated ? <Layout title="W-4 Withholding"><WithHolding/></Layout> :<Navigate to="/" />}
      />

      <Route
        path="/i9"
        element={isAuthenticated ? <Layout title="I-9 Employment Eligibility"><I9/></Layout> :<Navigate to="/" />}
      />
    </Routes>
  );
};

export default RoutesComponent;
