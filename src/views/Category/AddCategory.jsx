import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton,CFormSelect } from '@coreui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

function AddCategory() {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [formError, setFormError] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Specials'); // Default category


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foodName.trim() === '' || foodPrice.trim() === '') {
      setFormError(true);
    } else {
      setFormError(false);
      await submitData();
      resetForm();
    }

    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `FoodCategory/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      // console.("uploaded");
    }
    catch (err) { console.error(err) }
  };

  const resetForm = () => {
    setFoodName('');
    setFoodPrice('');
    setFileUpload(null);
    setSelectedCategory('Specials');
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = ''; // Clear the file input value to reset "No file chosen" text
    }
  };

  const submitData = async () => {
    try {
      // Add data to the "Menu" collection
      const menuRef = collection(db, `/Menu/${selectedCategory}/items`);
      await addDoc(menuRef, {
        Name: foodName,
        Price: foodPrice,
        imageUrl: fileUpload.name,
        // Add other data fields here if needed
      });
      console.log('Data submitted to Firebase.');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Add Food Category</h4>
      <hr />

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
          <CFormLabel htmlFor="sex">Category</CFormLabel>
          <CFormSelect
            id="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Salads">Salads</option>
            <option value="Beverages">Beverages</option>
            <option value="Starters">Starters</option>
            <option value="Specials">Specials</option>
            <option value="Desserts">Desserts</option>
          </CFormSelect>
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="image">Food Image</CFormLabel>
          <CFormInput
            type="file"
            id="image"
            onChange={(e) => setFileUpload(e.target.files[0])}
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

export default AddCategory;
