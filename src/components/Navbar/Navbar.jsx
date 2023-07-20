import React, { useState, useEffect } from 'react';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CNavbarBrand,

} from '@coreui/react';

import { useContext } from 'react';


import CIcon from '@coreui/icons-react';
import { cilUser, cilSettings, cilMenu } from '@coreui/icons';
import './Navbar.css';
import logo from '../../assets/ericsson.png'; // Update the path to your logo image

import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import { SidebarContext } from '../../context/SidebarContext';//


function Navbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUsername(user.displayName); // Retrieve the username from the user object
            } else {
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
        <CHeader position="sticky" >
            <CContainer fluid >
                <CHeaderToggler
                    className="ps-1"
                    onClick={toggleSidebar}>
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>

                <CHeaderBrand className="d-md-none">
                    Ericsson
                </CHeaderBrand>

                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/dashboard" >
                            Dashboard
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Settings</CNavLink>
                    </CNavItem>
                </CHeaderNav>

                <CHeaderNav>
                    <CDropdown variant="nav-item">
                        <CDropdownToggle>
                            <CIcon icon={cilUser} size="lg" />
                            {username && <span className="username">{username}</span>}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem>Profile</CDropdownItem>
                            <CDropdownItem>Settings</CDropdownItem>
                            <CDropdownItem>Messages</CDropdownItem>
                            <CDropdownItem onClick={handleLogout} >Logout</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>

            </CContainer>
        </CHeader>
    )
}

export default Navbar;




