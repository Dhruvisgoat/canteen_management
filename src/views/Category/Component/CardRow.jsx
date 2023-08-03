import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem, CButton, CCardImage, CFormInput } from '@coreui/react';
import { getDownloadURL, ref } from 'firebase/storage';
import { updateDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { storage, db } from '../../../config/firebase';
import './CardRow.css';
// Placeholder image URL
import placeholderImageUrl from '../../../assets/blank.png';

function CardRow({ title }) {
    const [imageUrls, setImageUrls] = useState({});
    const [editFormData, setEditFormData] = useState({ id: '', name: '', price: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [foodList, setFoodList] = useState([]);

    const getFoodList = async () => {
        try {
            // Fetch Specials category data
            const foodRef = collection(db, `/Menu/${title}/items`);
            const snapshot = await getDocs(foodRef);
            const foodData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setFoodList(foodData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchImageUrls = async () => {
        console.log(foodList);
        const urls = {};

        for (const food of foodList) {
            if (food.imageUrl) {
                try {
                    const storageRef = ref(storage, `FoodCategory/${title}/${food.imageUrl}`);
                    const imageUrl = await getDownloadURL(storageRef);
                    urls[food.id] = imageUrl;
                } catch (error) {
                    // Handle errors while fetching the image URL
                    console.error(`Error fetching image URL for food ${food.Name}:`, error);
                    // You can set a default fallback image URL in case of an error
                    urls[food.id] = placeholderImageUrl;
                }
            }
        }
        setImageUrls(urls);
    };
    
    useEffect(() => {
        async function fetchData() {
            await getFoodList();
            // fetchImageUrls is now called after foodList is updated
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Fetch image URLs only when foodList is updated and has data
        if (foodList.length > 0) {
            fetchImageUrls();
        }
    }, [foodList]);
      

    const handleEdit = (food) => {
        // Set the form data with the current values of the food
        setEditFormData({
            id: food.id,
            name: food.Name,
            price: food.Price
        });
        setIsEditing(true);
    };

    const handleEditChange = (event) => {
        // Update the edited form data as the user types
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        });
    };

    const handleEditSubmit = async () => {
        // Save the edited data to Firebase db
        const foodRef = doc(db, `/Menu/${title}/items`, editFormData.id);
    
        try {
            await updateDoc(foodRef, {
                Name: editFormData.name,
                Price: editFormData.price
            });
    
            // Update the foodList state with the edited data
            const updatedFoodList = foodList.map((food) =>
                food.id === editFormData.id
                    ? { ...food, Name: editFormData.name, Price: editFormData.price }
                    : food
            );
            setFoodList(updatedFoodList);
    
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };
    

    const handleDelete = async (food) => {
        // Display a confirmation prompt
        const isConfirmed = window.confirm('Are you sure you want to delete this food item?');
    
        if (isConfirmed) {
            const foodRef = doc(db, `/Menu/${title}/items`, food.id);
            try {
                await deleteDoc(foodRef);
    
                // Update the foodList state by removing the deleted food item
                const updatedFoodList = foodList.filter((item) => item.id !== food.id);
                setFoodList(updatedFoodList);
            } catch (error) {
                console.error('Error deleting food document:', error);
            }
        }
    };

    return (
        <div>
            <hr />
            <h5 className='m-2'>{title}</h5>
            <div className='CardRow' style={{ display: 'flex', overflowX: 'auto', minWidth: '100%' }}>
                {foodList.map((food) => (
                    <CCard className='Card' key={food.id} style={{ flex: '0 0 auto', width: '11rem', height: '100%', margin: '0 10px' }}>
                        {imageUrls[food.id] ? (
                            <CCardImage
                                orientation="top"
                                height='100px'
                                src={imageUrls[food.id]}
                                alt="no image"
                            />
                        ) : (
                            <img
                                src={placeholderImageUrl}
                                alt="placeholder"
                                style={{ height: '100px', objectFit: 'cover' }}
                            />
                        )}
                        <CCardBody>
                            {isEditing && editFormData.id === food.id ? (
                                <>
                                    <CFormInput
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                        className='m-1'
                                    />
                                    <CFormInput
                                        type="text"
                                        name="price"
                                        value={editFormData.price}
                                        onChange={handleEditChange}
                                        className='m-1'
                                    />
                                </>
                            ) : (
                                <div>
                                    <CCardTitle>{food.Name}</CCardTitle>
                                    <CListGroup flush>
                                        <CListGroupItem>Rs.{food.Price}</CListGroupItem>
                                    </CListGroup>
                                </div>
                            )}
                        </CCardBody>

                        <CCardBody>
                            {isEditing && editFormData.id === food.id ? (
                                <>
                                    <CButton size='sm' className='m-1' onClick={handleEditSubmit}>Save</CButton>
                                    <CButton size='sm' color='danger' onClick={() => setIsEditing(false)}>Cancel</CButton>
                                </>
                            ) : (
                                // Show the Edit button only when not in edit mode
                                <CButton size='sm' className='m-1' onClick={() => handleEdit(food)}>Edit</CButton>
                            )}
                            {/* Hide the Delete button when in edit mode */}
                            {!isEditing && (
                                <CButton size='sm' color='danger' onClick={() => handleDelete(food)}>Delete</CButton>
                            )}
                        </CCardBody>
                    </CCard>
                ))}
            </div>
        </div>
    );
}

export default CardRow;
