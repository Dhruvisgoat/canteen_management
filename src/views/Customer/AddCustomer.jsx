import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CFormTextarea, CFormSelect, CButton } from '@coreui/react';
import { db } from '../../config/firebase';
import { collection, doc, setDoc,getDocs } from 'firebase/firestore';

function AddCustomer() {
  const [customerName, setCustomerName] = useState('');
  const [customerSex, setCustomerSex] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [alternateAddress, setAlternateAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [alternateContactNo, setAlternateContactNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      customerName.trim() === '' ||
      presentAddress.trim() === '' ||
      contactNo.trim() === ''
    ) {
      setFormError(true);
    } else {
      setFormError(false);
      await submitData();
      resetForm();
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerSex('');
    setPresentAddress('');
    setAlternateAddress('');
    setContactNo('');
    setAlternateContactNo('');
    setEmailId('');
  };

  const generateCustomID = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Users'));
      const maxUserID = Math.max(...snapshot.docs.map((doc) => parseInt(doc.id)));
      const nextID = maxUserID + 1 || 20000001; // If no documents exist, start from 20000001
      return nextID.toString();
    } catch (error) {
      console.error(error);
    }
  };
  
  const submitData = async () => {
    const customID = await generateCustomID();
    try {
      const customerRef = doc(db, 'Users', customID);
      await setDoc(customerRef, {
        name: customerName,
        sex: customerSex,
        present_address: presentAddress,
        alternate_address: alternateAddress,
        contact_no: contactNo,
        alternate_contactNo: alternateContactNo,
        email_id: emailId,
        user_id: customID
      });
      console.log('Customer added with custom ID: ', customID);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div >
      <h4 className="text-center mt-3 mb-3">Add Customer</h4>
      <hr></hr>

      <CForm onSubmit={handleSubmit}>
        <div className="m-3">
          <CFormLabel htmlFor="name">
            <b>Customer Name</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="text"
            id="name"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            invalid={formError && customerName.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="email">Email Id</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            placeholder="Enter email address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div className="m-3">
          <CFormLabel htmlFor="sex">Customer Sex</CFormLabel>
          <CFormSelect
            id="sex"
            value={customerSex}
            onChange={(e) => setCustomerSex(e.target.value)}
          >
            <option value="">Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </CFormSelect>
        </div>
        <div className="m-3">
          <CFormLabel htmlFor="presentAddress">
            <b>Present Address</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormTextarea
            id="presentAddress"
            rows={3}
            placeholder="Enter Present address"
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
            invalid={formError && presentAddress.trim() === ''}
          />
        </div>
        <div className="m-3">
          <CFormLabel htmlFor="alternateAddress">Alternate Address</CFormLabel>
          <CFormTextarea
            id="alternateAddress"
            rows={3}
            placeholder="Enter Alternate address"
            value={alternateAddress}
            onChange={(e) => setAlternateAddress(e.target.value)}
          />
        </div>
        <div className="m-3">
          <CFormLabel htmlFor="contactNo">
            <b>Contact No.</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="tel"
            id="contactNo"
            placeholder="Enter contact number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            invalid={formError && contactNo.trim() === ''}
          />
        </div>
        <div className="m-3">
          <CFormLabel htmlFor="alternateContactNo">Alternate Contact No. </CFormLabel>
          <CFormInput
            type="tel"
            id="alternateContactNo"
            placeholder="Enter Alternate contact number"
            value={alternateContactNo}
            onChange={(e) => setAlternateContactNo(e.target.value)}
          />
        </div>
        <div className="text-center m-4">
          <CButton color="primary" type="submit" className='mx-2' onClick={submitData}>
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

export default AddCustomer;
