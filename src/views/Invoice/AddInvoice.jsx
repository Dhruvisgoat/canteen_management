import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react';

function AddInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      invoiceNumber.trim() === '' ||
      customerName.trim() === '' ||
      invoiceDate.trim() === '' ||
      amount.trim() === ''
    ) {
      setFormError(true);
    } else {
      // Submit form or perform other actions
      setFormError(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setInvoiceNumber('');
    setCustomerName('');
    setInvoiceDate('');
    setAmount('');
  };

  return (
    <div >
      <h4 className="text-center mt-3 mb-3">Add Invoice</h4>
      <hr></hr>
      
      <CForm onSubmit={handleSubmit}>
        <div className="m-3">
          <CFormLabel htmlFor="invoiceNumber">
            <b>Invoice Number</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="text"
            id="invoiceNumber"
            placeholder="Enter invoice number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            invalid={formError && invoiceNumber.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="customerName">
            <b>Customer Name</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="text"
            id="customerName"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            invalid={formError && customerName.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="invoiceDate">
            <b>Invoice Date</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="date"
            id="invoiceDate"
            placeholder="Select invoice date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            invalid={formError && invoiceDate.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="amount">
            <b>Amount</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            invalid={formError && amount.trim() === ''}
          />
        </div>

        <div className="text-center m-4">
          <CButton color="primary" type="submit" className="mx-2">
            Submit
          </CButton>
          <CButton color="secondary" type="button" className="ml-2" onClick={resetForm}>
            Reset
          </CButton>
        </div>
      </CForm>
    </div>
  );
}

export default AddInvoice;
