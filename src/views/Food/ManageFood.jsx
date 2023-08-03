import React, { useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButtonGroup, CFormCheck, CButton } from '@coreui/react';

const ManageFood = () => {
  const [foodData, setFoodData] = useState([
    { id: 1, name: 'Biryani', quantity: 10, price: 250, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 2, name: 'Butter Chicken', quantity: 8, price: 300, image: 'https://www.shutterstock.com/shutterstock/photos/2000023562/display_1500/stock-photo-dum-handi-chicken-biryani-is-prepared-in-an-earthen-or-clay-pot-called-haandi-popular-indian-non-2000023562.jpg' },
    { id: 3, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 4, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 5, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 6, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 7, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 8, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    { id: 9, name: 'Samosa', quantity: 15, price: 20, image: 'https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.jpg?s=612x612&w=0&k=20&c=4bZViynoVnP1HaWHIY1k5FvW-dj9DM2EOMHbKnAqYZ4=' },
    // Add more food items here...
  ]);
  const [sortOption, setSortOption] = useState('');

  const sortFoodItems = (sortBy) => {
    setSortOption(sortBy);

    let sortedFoodItems = [...foodData];
    sortedFoodItems.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });

    setFoodData(sortedFoodItems);
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Manage Food</h4>
      <hr></hr>

      <div className="d-flex align-items-center justify-content-end m-3">
        <span className="mr-2">Sort By:</span>
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
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        {foodData.map((food) => (
          <CCard key={food.id} className="m-3" style={{ width: '300px', height: '500px' }}>
            {food.image ? (
              <img height='30%' src={food.image} className="card-img-top" alt="Food" />
            ) : (
              <div className="text-center py-4">
                <span className="text-muted">No Image Available</span>
              </div>
            )}
            <CCardBody>
              <CCardTitle style={{ height: '20%' }}><b>{food.name}</b></CCardTitle>
              <CCardText>
                <b>Quantity:</b> {food.quantity} <br />
                <b>Price:</b> ${food.price}
              </CCardText>
              <div className="text-center">
                <CButton color="info" className="m-1" style={{ width: "100%" }}>Edit</CButton>
                <CButton color="danger" className="m-1" style={{ width: "100%", textAlign: 'center' }}>Delete</CButton>
              </div>
            </CCardBody>
          </CCard>
        ))}
      </div>


    </div>
  );
};

export default ManageFood;
