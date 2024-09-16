// src/VerifyOTP.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/api/auth/verify-otp', {
        userId,
        otp,
      });

      if (response.data.status==="Verified") {
        setMessage('OTP verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/vote'); // Redirect to login or another page
        }, 2000);
      } else {
        setMessage(response.data.msg || 'OTP verification failed!');
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              id="otp"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
