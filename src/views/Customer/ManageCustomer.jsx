import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ManageCustomer = () => {
  const customerCollectionRef = collection(db, 'Users');
  const [customerList, setCustomerList] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedSex, setEditedSex] = useState('');
  const [editedContact, setEditedContact] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getCustomerList = async () => {
    try {
      const data = await getDocs(customerCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomerList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'Users', id);
      await deleteDoc(docRef);
      console.log('Customer deleted.');
      getCustomerList();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const docRef = doc(db, 'Users', id);
      await updateDoc(docRef, updatedData);
      console.log('Customer updated.');
      getCustomerList();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const handleCellClick = (id, name, email, address, sex, contact) => {
    setEditingCustomerId(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditedAddress(address);
    setEditedSex(sex);
    setEditedContact(contact);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editedName && editingCustomerId) {
      await handleEdit(editingCustomerId, {
        name: editedName,
        email_id: editedEmail,
        present_address: editedAddress,
        sex: editedSex,
        contact_no: editedContact,
      });
      setIsEditing(false);
      setEditingCustomerId('');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingCustomerId('');
  };

  return (
    <div>
      <h4 className="m-3 text-center">Manage Customers</h4>
      <hr />
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Actions</CTableHeaderCell>
            <CTableHeaderCell>User_id</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Sex</CTableHeaderCell>
            <CTableHeaderCell>Contact</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {customerList.map((customer) => (
            <CTableRow key={customer.id}>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <CButton
                    color="danger"
                    size="sm"
                    className="mr-2 mb-1"
                    style={{width: '100%'}}
                    onClick={handleSave}
                  >
                    Save
                  </CButton>
                ) : (
                  <CButton
                    color="info"
                    size="sm"
                    style={{width: '100%'}}
                    className="mr-2"
                    onClick={() => handleCellClick(customer.id, customer.name, customer.email_id, customer.present_address, customer.sex, customer.contact_no)}
                  >
                    Edit
                  </CButton>
                )}
                {isEditing && editingCustomerId === customer.id && (
                  <CButton
                    color="primary"
                    className='mr-2'
                    style={{width: '100%'}}
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </CButton>
                )}
              </CTableDataCell>
              <CTableDataCell>{customer.user_id}</CTableDataCell>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  customer.name
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  customer.email_id
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                ) : (
                  customer.present_address
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={editedSex}
                    onChange={(e) => setEditedSex(e.target.value)}
                  />
                ) : (
                  customer.sex
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditing && editingCustomerId === customer.id ? (
                  <input
                    type="text"
                    value={editedContact}
                    onChange={(e) => setEditedContact(e.target.value)}
                  />
                ) : (
                  customer.contact_no
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ManageCustomer;
