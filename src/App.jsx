import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Login from './pages/LoginPage/Login';
import './scss/style.scss';
import Register from './pages/RegisterPage/Register';
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword';
import Home from './pages/HomePage/Home.jsx';
import Dashboard from './views/Dashboard/Dashboard';
import { SidebarProvider } from './context/SidebarContext';
import { Suspense } from 'react';
import { CSpinner } from '@coreui/react';
import './scss/style.scss'
import Otp from './pages/Otp/Otp';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
  
)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <SidebarProvider>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home/*" element={<Home/>} />
            <Route path="/otp" element={<Otp />} />
            <Route path="*" element={<div>error</div>} />
          </Routes>
        </Suspense>
      </SidebarProvider>
    </Router>
  );
}

export default App;
