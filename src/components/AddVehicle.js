import React, { useState } from 'react';
import { API_BASE_URI } from './constants';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: '',
    capacityKg: '',
    tyres: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URI}/api/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          capacityKg: parseFloat(formData.capacityKg),
          tyres: parseInt(formData.tyres)
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Vehicle added successfully!');
        setFormData({ name: '', capacityKg: '', tyres: '' });
      } else {
        setMessage(data.error || 'Error adding vehicle');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Capacity (KG):</label>
          <input
            type="number"
            name="capacityKg"
            value={formData.capacityKg}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Tyres:</label>
          <input
            type="number"
            name="tyres"
            value={formData.tyres}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Add Vehicle
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default AddVehicle;