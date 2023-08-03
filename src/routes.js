import React from 'react';

// Code-splitting: Dynamically import components using React.lazy
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const AddCustomer = React.lazy(() => import('./views/Customer/AddCustomer'));
const ManageCustomer = React.lazy(() => import('./views/Customer/ManageCustomer'));
const AddEmployee = React.lazy(() => import('./views/Employee/AddEmployee'));
const ManageEmployee = React.lazy(() => import('./views/Employee/ManageEmployee'));
const AddCategory = React.lazy(() => import('./views/Category/AddCategory'));
const ManageCategory = React.lazy(() => import('./views/Category/ManageCategory'));
const AddFood = React.lazy(() => import('./views/Food/AddFood'));
const ManageFood = React.lazy(() => import('./views/Food/ManageFood'));
const AddInvoice = React.lazy(() => import('./views/Invoice/AddInvoice'));
const ManageInvoice = React.lazy(() => import('./views/Invoice/ManageInvoice'));
const Reports = React.lazy(() => import('./views/Reports/Reports'));
const Settings = React.lazy(() => import('./views/Settings/Settings'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/addCustomer', name: 'AddCustomer', element: AddCustomer },
  { path: '/manageCustomer', name: 'ManageCustomer', element: ManageCustomer },
  { path: '/manageEmployee', name: 'ManageEmployee', element: ManageEmployee },
  { path: '/addEmployee', name: 'AddEmployee', element: AddEmployee },
  { path: '/addCategory', name: 'AddCategory', element: AddCategory },
  { path: '/manageCategory', name: 'ManageCategory', element: ManageCategory },
  { path: '/addFood', name: 'AddFood', element: AddFood },
  { path: '/manageFood', name: 'ManageFood', element: ManageFood },
  { path: '/addInvoice', name: 'AddInvoice', element: AddInvoice },
  { path: '/manageInvoice', name: 'ManageInvoice', element: ManageInvoice },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/settings', name: 'Settings', element: Settings },
];

export default routes;
