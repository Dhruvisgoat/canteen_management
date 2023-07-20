import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';

const Reports = () => {
  const [orderData, setOrderData] = useState([
    { id: 1, date: '2023-07-01', customer: 'John Doe', food: 'Burger', quantity: 2, total: 10 },
    { id: 2, date: '2023-07-02', customer: 'Jane Smith', food: 'Pizza', quantity: 1, total: 8 },
    // Add more order data here...
  ]);

  const getTotalRevenue = () => {
    return orderData.reduce((total, order) => total + order.total, 0);
  };

  return (
    <div>
      <h4 className="m-3 text-center">Reports</h4>
      <hr />
      <CCard>
        <CCardHeader>Order Summary</CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Order ID</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Customer</CTableHeaderCell>
                <CTableHeaderCell>Food</CTableHeaderCell>
                <CTableHeaderCell>Quantity</CTableHeaderCell>
                <CTableHeaderCell>Total</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orderData.map((order) => (
                <CTableRow key={order.id}>
                  <CTableDataCell>{order.id}</CTableDataCell>
                  <CTableDataCell>{order.date}</CTableDataCell>
                  <CTableDataCell>{order.customer}</CTableDataCell>
                  <CTableDataCell>{order.food}</CTableDataCell>
                  <CTableDataCell>{order.quantity}</CTableDataCell>
                  <CTableDataCell>{order.total}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mt-4">
        <CCardHeader>Revenue Summary</CCardHeader>
        <CCardBody>
          <p>Total Revenue: ${getTotalRevenue()}</p>
          <CButton color="primary">Export Report</CButton>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Reports;
