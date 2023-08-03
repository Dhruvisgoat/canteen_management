import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import AppContent from '../../components/Content/Appcontent';
import Footer from '../../components/Footer/Footer';


const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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

  const [ toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div >
      {loggedIn ? (
        <div >
          <Sidebar toggleSidebar={toggleSidebar}  />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Navbar setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <div>
              <Footer />
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
