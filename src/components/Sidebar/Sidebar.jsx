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
  CNavLink
} from '@coreui/react';
import { cilSpeedometer, cilPuzzle, cilNoteAdd, cilSpreadsheet, cilUser, cilFastfood, cilBurger, cilBook, cilFlagAlt, cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/ericsson_full_logo_dark.png';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

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

        <CNavItem component={Link} to="/home/dashboard">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          Dashboard
        </CNavItem>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilUser} style={{ marginRight: '5px' }} />
          <span>Customer</span>
        </div>}>
          <CNavItem component={Link} to="/home/addCustomer">
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Customer
          </CNavItem>
          <CNavItem component={Link} to="/home/manageCustomer">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Customers
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilUser} style={{ marginRight: '5px' }} />
          <span>Employee</span>
        </div>}>
          <CNavItem component={Link} to="/home/addEmployee">
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Employee
          </CNavItem>
          <CNavItem component={Link} to="/home/manageEmployee">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Employees
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilFastfood} style={{ marginRight: '5px' }} />
          <span>Food Category</span>
        </div>}>
          <CNavItem component={Link} to="/home/addCategory">
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Category
          </CNavItem>
          <CNavItem component={Link} to="/home/manageCategory">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Categories
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilBurger} style={{ marginRight: '5px' }} />
          <span>Food</span>
        </div>}>
          <CNavItem component={Link} to="/home/addFood">
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Food
          </CNavItem>
          <CNavItem component={Link} to="/home/manageFood">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Food
          </CNavItem>
        </CNavGroup>

        <CNavGroup toggler={<div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CIcon customClassName="nav-icon" icon={cilBook} style={{ marginRight: '5px' }} />
          <span>Invoice</span>
        </div>}>
          <CNavItem component={Link} to="/home/addInvoice">
            <CIcon customClassName="nav-icon" icon={cilNoteAdd} /> Add Invoice
          </CNavItem>
          <CNavItem component={Link} to="/home/manageInvoice">
            <CIcon customClassName="nav-icon" icon={cilSpreadsheet} /> Manage Invoices
          </CNavItem>
        </CNavGroup>

        <CNavItem component={Link} to="/home/reports">
          <CIcon customClassName="nav-icon" icon={cilFlagAlt} />
          Reports
        </CNavItem>
        <CNavItem component={Link} to="/home/settings">
          <CIcon customClassName="nav-icon" icon={cilSettings} />
          Settings
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
