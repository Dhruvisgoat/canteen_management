import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';

import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from 'react';
import { CContainer } from '@coreui/react';


const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUsername(user.displayName); // Retrieve the username from the user object
      } else {
        setLoggedIn(false);
        setUsername('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      // Perform any additional logout actions if needed
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      {loggedIn ? (
        <div >
          <Sidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Navbar/>
            <div className="body flex-grow-1 px-3">
              <Content/>
            </div>
            <div>
              <Footer/>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Not logged in</h1>
          <CButton onClick={() => navigate('/')} color="primary">
            Login
          </CButton>
        </div>
      )}
    </div>
  );
};

export default Home;
