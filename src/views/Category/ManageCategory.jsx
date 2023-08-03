import React, { useState, useEffect } from 'react';
import { CButtonGroup, CFormCheck, CButton } from '@coreui/react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CardRow from './Component/CardRow';

const ManageFoodCategory = () => {
  const [foodData, setFoodData] = useState([]);
  const [sortOption, setSortOption] = useState('');
  
  const sortFoodItems = (sortBy) => {
    setSortOption(sortBy);

    const sortedFoodData = {
      specials: [...foodData.specials],
      desserts: [...foodData.desserts],
      salads: [...foodData.salads],
      // Add more categories here if needed
    };

    sortedFoodData.specials.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    sortedFoodData.desserts.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    sortedFoodData.salads.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    // Add more categories here if needed

    setFoodData(sortedFoodData);
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Manage Food Categories</h4>
      <hr></hr>
      <div className="d-flex align-items-center justify-content-end m-3">
        <span className="mr-2">Sort By: </span>
        <CButtonGroup size='sm'>
          <CFormCheck
            type="radio"
            button={{ color: 'primary', variant: 'outline' }}
            name="sortOption"
            id="name"
            autoComplete="off"
            label="Name"
            checked={sortOption === 'name'}
            onChange={() => sortFoodItems('name')}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'primary', variant: 'outline' }}
            name="sortOption"
            id="price"
            autoComplete="off"
            label="Price"
            checked={sortOption === 'price'}
            onChange={() => sortFoodItems('price')}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'primary', variant: 'outline' }}
            name="sortOption"
            id="quantity"
            autoComplete="off"
            label="Quantity"
            checked={sortOption === 'quantity'}
            onChange={() => sortFoodItems('quantity')}
          />
        </CButtonGroup>
      </div>

        <CardRow title="Specials" />
        <CardRow title="Desserts" />
        <CardRow title="Salads" />

      {/* Add more CardRow components for other categories if needed */}
    </div>
  );
};

export default ManageFoodCategory;
