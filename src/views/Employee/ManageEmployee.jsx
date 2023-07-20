import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ManageEmployee = () => {
  const employeeCollectionRef = collection(db, 'Employee');
  const [employeeList, setEmployeeList] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedSex, setEditedSex] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getEmployeeList = async () => {
    try {
      const data = await getDocs(employeeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployeeList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'Employee', id);
      await deleteDoc(docRef);
      console.log('Employee deleted.');
      getEmployeeList();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const docRef = doc(db, 'Employee', id);
      await updateDoc(docRef, updatedData);
      console.log('Employee updated.');
      getEmployeeList();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleCellClick = (id, name, email, sex, age, address) => {
    setEditingEmployeeId(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditedSex(sex);
    setEditedAge(age);
    setEditedAddress(address);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editedName && editingEmployeeId) {
      await handleEdit(editingEmployeeId, {
        name: editedName,
        email_id: editedEmail,
        sex: editedSex,
        age: editedAge,
        address: editedAddress,
      });
      setIsEditing(false);
      setEditingEmployeeId('');
    }
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setEditingEmployeeId('');
  };

  return (
    <div>
      <h4 className="m-3 text-center">Manage Employees</h4>
      <hr />
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Actions</CTableHeaderCell>
            <CTableHeaderCell>employee_id</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Sex</CTableHeaderCell>
            <CTableHeaderCell>Age</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeList.map((employee) => (
            <CTableRow key={employee.id}>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <CButton
                    color="danger"
                    size="sm"
                    className="mr-2 mb-1"
                    style={{ width: '100%' }}
                    onClick={handleSave}
                  >
                    Save
                  </CButton>
                ) : (
                  <CButton
                    color="info"
                    size="sm"
                    style={{ width: '100%' }}
                    className="mr-2"
                    onClick={() => handleCellClick(employee.id, employee.name, employee.email, employee.sex, employee.age, employee.address)}
                  >
                    Edit
                  </CButton>
                )}
                {isEditing && editingEmployeeId === employee.id && (
                  <CButton
                    color="primary"
                    className="mr-2"
                    style={{ width: '100%' }}
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </CButton>
                )}
              </CTableDataCell>
              <CTableDataCell>{employee.employee_id}</CTableDataCell>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  employee.name
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  employee.email_id
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    value={editedSex}
                    onChange={(e) => setEditedSex(e.target.value)}
                  />
                ) : (
                  employee.sex
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    value={editedAge}
                    onChange={(e) => setEditedAge(e.target.value)}
                  />
                ) : (
                  employee.age
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                ) : (
                  employee.address
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ManageEmployee;
