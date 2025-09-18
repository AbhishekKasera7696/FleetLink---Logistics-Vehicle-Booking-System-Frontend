import React, { useState } from 'react';
import AddVehicle from './components/AddVehicle';
import SearchAndBook from './components/SearchAndBook';

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>FleetLink - Logistics Vehicle Booking System</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('add')} 
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px', 
            backgroundColor: activeTab === 'add' ? '#007bff' : '#f8f9fa', 
            color: activeTab === 'add' ? 'white' : 'black',
            border: '1px solid #ddd'
          }}
        >
          Add Vehicle
        </button>
        <button 
          onClick={() => setActiveTab('search')} 
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px', 
            backgroundColor: activeTab === 'search' ? '#007bff' : '#f8f9fa', 
            color: activeTab === 'search' ? 'white' : 'black',
            border: '1px solid #ddd'
          }}
        >
          Search & Book
        </button>
      </div>
      {activeTab === 'add' ? <AddVehicle /> : <SearchAndBook />}
    </div>
  );
}

export default App;