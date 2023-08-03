import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow } from '@coreui/react';

function ManageInvoices() {
  const navigate = useNavigate();

  // Assume you have an array of invoices in the format:
  const initialInvoices = [
    { id: 1, invoiceNumber: 'INV001', customerName: 'John Doe', invoiceDate: '2023-08-01', amount: 100 },
    // Add more invoices as needed
  ];

  const [invoices, setInvoices] = React.useState(initialInvoices);
  const [invoiceNumber, setInvoiceNumber] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [invoiceDate, setInvoiceDate] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new invoice
    const newInvoice = {
      id: Date.now(),
      invoiceNumber,
      customerName,
      invoiceDate,
      amount: parseFloat(amount),
    };
    setInvoices([...invoices, newInvoice]);
    resetForm();
  };

  const handleDelete = (invoiceId) => {
    const filteredInvoices = invoices.filter((invoice) => invoice.id !== invoiceId);
    setInvoices(filteredInvoices);
  };

  const resetForm = () => {
    setInvoiceNumber('');
    setCustomerName('');
    setInvoiceDate('');
    setAmount('');
  };

  const handleAddInvoiceClick = () => {
    navigate('/home/addInvoice'); // Replace '/add-invoice' with the route to your AddInvoice page
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Manage Invoices</h4>
      <hr/>

      <CTable responsive>
        <CTableHead>
          <CTableRow>
            <CTableDataCell>Invoice Number</CTableDataCell>
            <CTableDataCell>Customer Name</CTableDataCell>
            <CTableDataCell>Invoice Date</CTableDataCell>
            <CTableDataCell>Amount</CTableDataCell>
            <CTableDataCell>Action</CTableDataCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {invoices.map((invoice) => (
            <CTableRow key={invoice.id}>
              <CTableDataCell>{invoice.invoiceNumber}</CTableDataCell>
              <CTableDataCell>{invoice.customerName}</CTableDataCell>
              <CTableDataCell>{invoice.invoiceDate}</CTableDataCell>
              <CTableDataCell>{invoice.amount}</CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" size="sm" onClick={() => handleDelete(invoice.id)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <div className="text-center mt-4 mb-3">
        <CButton color="primary" onClick={handleAddInvoiceClick}>
          Add Invoice
        </CButton>
      </div>
    </div>
  );
}

export default ManageInvoices;
