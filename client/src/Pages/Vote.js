import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Vote() {
  const [pinCode, setPinCode] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vote Now</h1>

      <div className="mb-6">
        <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
          Enter Your Area PinCode:
        </label>
        <input
          type="text"
          id="pincode"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          
          className="border border-gray-300 rounded py-2 px-4 w-64 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="e.g., 123456"
        />
        {console.log("Pin Code",pinCode)}
        <Link 
          to={`/candidate/${pinCode}`} // Pass pinCode as a URL parameter
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Fetch Candidates
        </Link>
      </div>
    </div>
  );
}

export default Vote;



