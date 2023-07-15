import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Login from './pages/LoginPage/Login';
import './scss/style.scss';
import Register from './pages/RegisterPage/Register';
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword';
import Home from './pages/HomePage/Home.jsx';
import { SidebarProvider } from './context/SidebarContext';



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
    // Show a loading spinner or component while checking the authentication status
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
