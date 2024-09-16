import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [voterId, setVoterId] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5002/api/auth/signup', {
        name,
        email,
        voterId,
        pinCode,
        password,
      });

      if (data.status === 'Pending') {
        alert('Registration Successful, please check your email for OTP');
        setUserId(data.data.userId); // Assuming the userId is returned in the response
        setRedirect(true);
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Registration failed');
    }
  }

  if (redirect) {
    return <Navigate to={`/verify-otp?userId=${userId}`} />;
  }

  return (
    <div className="flex w-full h-full px-6 py-10 justify-center items-center bg-gray-100">
      <div className="bg-white w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={registerUser}>
          
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="voterId" className="text-sm font-semibold text-gray-700 mb-1">Voter ID</label>
            <input
              id="voterId"
              type="text"
              placeholder="Voter ID"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={voterId}
              onChange={(ev) => setVoterId(ev.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pinCode" className="text-sm font-semibold text-gray-700 mb-1">Pin Code</label>
            <input
              id="pinCode"
              type="text"
              placeholder="Pin Code"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pinCode}
              onChange={(ev) => setPinCode(ev.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create Account
          </button>

          <div className="flex justify-between text-sm mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Sign In</Link>
            <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
          </div>

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
