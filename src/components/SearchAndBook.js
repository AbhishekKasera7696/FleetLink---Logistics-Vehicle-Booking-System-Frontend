import React, { useState } from 'react';
import { API_BASE_URI } from './constants';

const SearchAndBook = () => {
  const [searchData, setSearchData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        capacityRequired: searchData.capacityRequired,
        fromPincode: searchData.fromPincode,
        toPincode: searchData.toPincode,
        startTime: new Date(searchData.startTime).toISOString()
      }).toString();

      const response = await fetch(`${API_BASE_URI}/api/vehicles/available?${queryParams}`);
      const data = await response.json();
      if (response.ok) {
        setVehicles(data);
        setMessage('');
      } else {
        setMessage(data.error || 'Error searching vehicles');
        setVehicles([]);
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (vehicle) => {
    try {
      const response = await fetch(`${API_BASE_URI}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          fromPincode: searchData.fromPincode,
          toPincode: searchData.toPincode,
          startTime: new Date(searchData.startTime).toISOString(),
          customerId: 'customer1' //intentionally given customer1
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Booking successful!');
        handleSearch({ preventDefault: () => {} });
      } else {
        setMessage(data.error || 'Error booking vehicle');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Search and Book Vehicle</h2>
      <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <div>
          <label>Capacity Required (KG):</label>
          <input
            type="number"
            name="capacityRequired"
            value={searchData.capacityRequired}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>From Pincode:</label>
          <input
            type="text"
            name="fromPincode"
            value={searchData.fromPincode}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>To Pincode:</label>
          <input
            type="text"
            name="toPincode"
            value={searchData.toPincode}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={searchData.startTime}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none',
              width: '100%',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Searching...' : 'Search Availability'}
          </button>
        </div>
      </form>

      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

      <div>
        <h3>Available Vehicles</h3>
        {vehicles.length === 0 ? (
          <p>No vehicles available</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {vehicles.map(vehicle => (
              <div key={vehicle._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                <p><strong>Name:</strong> {vehicle.name}</p>
                <p><strong>Capacity:</strong> {vehicle.capacityKg} KG</p>
                <p><strong>Tyres:</strong> {vehicle.tyres}</p>
                <p><strong>Estimated Ride Duration:</strong> {vehicle.estimatedRideDurationHours} hours</p>
                <button 
                  onClick={() => handleBook(vehicle)}
                  style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndBook;