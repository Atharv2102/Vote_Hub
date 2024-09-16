import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

export default function VerifyOTP() {
  const [userId, setUserId] = useState(''); // Assume userId is passed or stored somewhere
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  async function verifyOtp(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5002/api/auth/verify-otp', {
        userId,
        otp
      });

      if (data.status === 'Verified') {
        alert('Account verified successfully');
        setVerificationStatus(true);
      } else {
        alert(data.message);
        setVerificationStatus(false);
      }
    } catch (e) {
      alert('Verification failed');
      setVerificationStatus(false);
    }
  }

  if (verificationStatus) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex w-full h-full px-6 py-10 justify-center items-center bg-gray-100">
      <div className="bg-white w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Verify OTP</h1>
        <form className="space-y-4" onSubmit={verifyOtp}>
          
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-sm font-semibold text-gray-700 mb-1">Enter OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="OTP"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(ev) => setOtp(ev.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Verify OTP
          </button>

          <Link to="/" className="block mt-4 text-center">
            <button className="text-blue-500 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline w-4 h-4">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
