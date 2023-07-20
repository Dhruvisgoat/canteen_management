import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react';

function AddFood() {
  const [foodName, setFoodName] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [formError, setFormError] = useState(false);
  const [foodImage, setFoodImage] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      foodName.trim() === '' ||
      foodQuantity.trim() === '' ||
      foodPrice.trim() === ''
    ) {
      setFormError(true);
    } else {
      // Submit form or perform other actions
      setFormError(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFoodName('');
    setFoodQuantity('');
    setFoodPrice('');
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Add Food</h4>
      <hr></hr>

      <CForm onSubmit={handleSubmit}>
        <div className="m-3">
          <CFormLabel htmlFor="name">
            <b>Food Name</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="text"
            id="name"
            placeholder="Enter food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            invalid={formError && foodName.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="quantity">
            <b>Food Quantity</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="number"
            id="quantity"
            placeholder="Enter food quantity"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
            invalid={formError && foodQuantity.trim() === ''}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="price">
            <b>Food Price</b> <span style={{ color: 'red' }}>*</span>
          </CFormLabel>
          <CFormInput
            type="number"
            id="price"
            placeholder="Enter food price"
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            invalid={formError && foodPrice.trim() === ''}
          />
        </div>
        
        <div className="m-3">
          <CFormLabel htmlFor="image">Food Image</CFormLabel>
          <CFormInput
            type="file"
            id="image"
            onChange={(e) => setFoodImage(e.target.files[0])}
          />
        </div>

        <div className="text-center m-4">
          <CButton color="primary" type="submit" className='mx-2'>
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

export default AddFood;
