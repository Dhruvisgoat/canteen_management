import React from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
  CSidebarToggler,
} from '@coreui/react';
import { cilSpeedometer, cilPuzzle, cilNoteAdd, cilSpreadsheet, cilUser, cilFastfood, cilBurger, cilBook, cilFlagAlt, cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from 'react';

import logo from '../../assets/ericsson_full_logo_dark.png';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarOpen}
      className='c-sidebar'
    >

      <CSidebarBrand>
        <img src={logo} style={{ height: '50px', width: '80px' }} />
      </CSidebarBrand>
      <CSidebarNav>

        <CNavTitle>Admin Id:</CNavTitle>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Dashboard
        </CNavItem>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilUser} style={{ marginRight: '5px' }} />
          <span>Customer</span>
        </div>} >
          <CNavItem href="#" >
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Customer
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Customers
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilFastfood} style={{ marginRight: '5px' }} />
          <span>Food Category</span>
        </div>} >
          <CNavItem href="#" >
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Category
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Categories
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilBurger} style={{ marginRight: '5px' }} />
          <span>Food </span>
        </div>} >
          <CNavItem href="#" >
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Food
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Food
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilBook} style={{ marginRight: '5px' }} />
          <span>Invoice</span>
        </div>} >
          <CNavItem href="#" >
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Invoice
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Invoices
          </CNavItem>
        </CNavGroup>

        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilFlagAlt} />
          Reports
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSettings} />
          Settings
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
