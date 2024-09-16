import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> upstream/main
import axios from 'axios';

function Vote({ userId }) {
  const [pinCode, setPinCode] = useState('');
<<<<<<< HEAD
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCandidates = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5002/api/auth/candidate?pinCode=${pinCode}`);
      setCandidates(response.data);
    } catch (e) {
      setError('Failed to fetch candidates');
    } finally {
      setLoading(false);
=======
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
>>>>>>> upstream/main
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
<<<<<<< HEAD
          onClick={fetchCandidates}
=======
          onClick={handleSubmit}
>>>>>>> upstream/main
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Fetch Candidates
        </button>
<<<<<<< HEAD
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="mt-6">
        {candidates.length > 0 ? (
          <ul className="list-disc pl-5">
            {candidates.map((candidate) => (
              <li key={candidate.id} className="mb-2">
                <p className="text-gray-800">{candidate.name}</p>
                <p className="text-gray-600">Party: {candidate.party}</p>
              </li>
            ))}
          </ul>
        ) : (
          pinCode && !loading && !error && <p>No candidates found.</p>
        )}
=======

        {error && <p className="text-red-500 mt-4">{error}</p>}
>>>>>>> upstream/main
      </div>
    </div>
  );
}

export default Vote;
