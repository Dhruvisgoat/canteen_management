import React from 'react'

// const Customer = React.lazy(() => import('./views/Customer/Customer'))
import Dashboard from './views/Dashboard/Dashboard'
import AddCustomer from './views/Customer/AddCustomer'
import ManageCustomer from './views/Customer/ManageCustomer'
import AddEmployee from './views/Employee/AddEmployee'
import ManageEmployee from './views/Employee/ManageEmployee'
import AddCategory from './views/Category/AddCategory'
import ManageCategory from './views/Category/ManageCategory'
import AddFood from './views/Food/AddFood'
import ManageFood from './views/Food/ManageFood'
import AddInvoice from './views/Invoice/AddInvoice'
import ManageInvoice from './views/Invoice/ManageInvoice'
import Reports from './views/Reports/Reports'
import Settings from './views/Settings/Settings'


const routes = [
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/addCustomer', name: 'addCustomer', element: AddCustomer },
    { path: '/manageCustomer', name: 'manageCustomer', element: ManageCustomer },
    { path: '/manageEmployee', name: 'manageEmployee', element: ManageEmployee },
    { path: '/addEmployee', name: 'addEmployee', element: AddEmployee },
    { path: '/addCategory', name: 'addCategory', element: AddCategory },
    { path: '/manageCategory', name: 'addCustomer', element: ManageCategory },
    { path: '/addFood', name: 'addFood', element: AddFood },
    { path: '/manageFood', name: 'manageFood', element: ManageFood },
    { path: '/addInvoice', name: 'addInvoice', element: AddInvoice },
    { path: '/manageInvoice', name: 'manageInvoice', element: ManageInvoice },
    { path: '/reports', name: 'reports', element: Reports },
    { path: '/settings', name: 'Settings', element: Settings }
]

export default routes
