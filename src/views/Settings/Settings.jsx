import React, { useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react';

function Settings() {
  // Initial state for settings
  const initialSettings = {
    canteenName: 'My Canteen',
    openingHours: '9:00 AM - 6:00 PM',
    contactEmail: 'canteen@example.com',
    contactPhone: '123-456-7890',
  };

  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the settings here (e.g., send to server or store in local storage)
    console.log('Settings submitted:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h4 className="text-center mt-3 mb-3">Canteen Settings</h4>
      <hr />

      <CForm onSubmit={handleSubmit}>
        <div className="m-3">
          <CFormLabel htmlFor="canteenName">
            <b>Canteen Name</b>
          </CFormLabel>
          <CFormInput
            type="text"
            id="canteenName"
            name="canteenName"
            placeholder="Enter canteen name"
            value={settings.canteenName}
            onChange={handleChange}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="openingHours">
            <b>Opening Hours</b>
          </CFormLabel>
          <CFormInput
            type="text"
            id="openingHours"
            name="openingHours"
            placeholder="Enter opening hours"
            value={settings.openingHours}
            onChange={handleChange}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="contactEmail">
            <b>Contact Email</b>
          </CFormLabel>
          <CFormInput
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="Enter contact email"
            value={settings.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div className="m-3">
          <CFormLabel htmlFor="contactPhone">
            <b>Contact Phone</b>
          </CFormLabel>
          <CFormInput
            type="tel"
            id="contactPhone"
            name="contactPhone"
            placeholder="Enter contact phone"
            value={settings.contactPhone}
            onChange={handleChange}
          />
        </div>

        <div className="text-center m-4">
          <CButton color="primary" type="submit" className="mx-2">
            Save Settings
          </CButton>
        </div>
      </CForm>
    </div>
  );
}

export default Settings;
