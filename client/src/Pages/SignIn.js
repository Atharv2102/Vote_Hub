import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [voterId, setVoterId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();  // Define the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('voterId', voterId);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('pinCode', pinCode);
    formData.append('password', password);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost:5002/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.status === "Pending") {
        setMessage('Signup successful! Redirecting to OTP verification...');
        // Navigate to verify-otp page with the userId
        navigate('/verify-otp', { state: { userId: response.data.data.userId } });
      } else {
        setMessage(response.data.msg || 'Signup failed!');
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Something went wrong!');
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div></div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Sign up with e-mail
                </div>
              </div>
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <input
                  required
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Voter ID"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                />
                <input
                  required
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  required
                  className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Pin Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <input
                  required
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("./images/cover.webp")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;