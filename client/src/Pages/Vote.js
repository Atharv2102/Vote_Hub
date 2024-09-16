import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Vote({ userId }) {
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after verification

  const handleSubmit = async () => {
    try {
      // API call to verify the pin code
      const response = await axios.post('http://localhost:5002/api/vote/verify-pincode', {
        userId, // Assuming you pass the userId as a prop
        pinCode
      });

      if (response.status === 200) {
        // Navigate to the candidates page with pinCode and fetched candidates
        navigate(`/candidate/${pinCode}`, { state: { candidates: response.data.candidates } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify pin code');
    }
  };

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
        <button
          onClick={handleSubmit}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Fetch Candidates
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Vote;



