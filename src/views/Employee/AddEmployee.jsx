import React, { useState } from 'react';
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CButton,
} from '@coreui/react';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

function AddEmployee() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeSex, setEmployeeSex] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeContactNo, setEmployeeContactNo] = useState('');
  const [employeeEmailId, setEmployeeEmailId] = useState('');
  const [employeePhotoProof, setEmployeePhotoProof] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      employeeName.trim() === '' ||
      employeeAddress.trim() === '' ||
      employeeContactNo.trim() === ''
    ) {
      setFormError(true);
    } else {
      setFormError(false);
      await submitData();
      resetForm();
    }
  };

  const resetForm = () => {
    setEmployeeName('');
    setEmployeeSex('');
    setEmployeeAge('');
    setEmployeeAddress('');
    setEmployeeContactNo('');
    setEmployeeEmailId('');
    setEmployeePhotoProof('');
  };

  const generateCustomID = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Employee'));
      if (snapshot.empty) {
        return '3001'; // Start from 3001 if no documents exist
      }
      const maxEmployeeID = Math.max(...snapshot.docs.map((doc) => parseInt(doc.id)));
      const nextID = maxEmployeeID + 1;
      return nextID.toString();
    } catch (error) {
      console.error(error);
    }
  };

  const submitData = async () => {
    const customID = await generateCustomID();
    try {
      const employeeRef = doc(db, 'Employee', customID);
      await setDoc(employeeRef, {
        name: employeeName,
        sex: employeeSex,
        age: employeeAge,
        address: employeeAddress,
        contact_no: employeeContactNo,
        email_id: employeeEmailId,
        photo_proof: employeePhotoProof,
        employee_id: customID
      });
      console.log('Employee added with custom ID: ', customID);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Add Employee</h4>
      <hr />

      <CForm onSubmit={handleSubmit}>
        <div className="m-3">
          <CFormLabel htmlFor="name">
            <b>Employee Name</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="text"
            id="name"
            placeholder="Enter employee name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            invalid={formError && employeeName.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="email">Email Id</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            placeholder="Enter email address"
            value={employeeEmailId}
            onChange={(e) => setEmployeeEmailId(e.target.value)}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="sex">Employee Sex</CFormLabel>
          <CFormSelect
            id="sex"
            value={employeeSex}
            onChange={(e) => setEmployeeSex(e.target.value)}
          >
            <option value="">Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </CFormSelect>
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="age">Employee Age</CFormLabel>
          <CFormInput
            type="text"
            id="age"
            placeholder="Enter employee age"
            value={employeeAge}
            onChange={(e) => setEmployeeAge(e.target.value)}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="address">
            <b>Employee Address</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormTextarea
            id="address"
            rows={3}
            placeholder="Enter employee address"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            invalid={formError && employeeAddress.trim() === ''}
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
            value={employeeContactNo}
            onChange={(e) => setEmployeeContactNo(e.target.value)}
            invalid={formError && employeeContactNo.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="photoProof">Employee Photo Proof</CFormLabel>
          <CFormInput
            type="file"
            id="photoProof"
            placeholder="Enter employee photo proof"
            value={employeePhotoProof}
            onChange={(e) => setEmployeePhotoProof(e.target.value)}
          />
        </div>

        <div className="text-center m-4">
          <CButton color="primary" type="submit" className="mx-2">
            Submit
          </CButton>
          <CButton
            color="secondary"
            type="button"
            className="ml-2"
            onClick={resetForm}
          >
            Reset
          </CButton>
        </div>
      </CForm>
    </div>
  );
}

export default AddEmployee;
