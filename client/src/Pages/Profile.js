import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({
    voterId: "",
    email: "",
    name: "",
    pinCode: "",
    password: "",
    isVerified: false,
    photo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          window.location.href="/login";
        
        }

        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        console.log(email);
        console.log(decodedToken.photo);
        const response = await axios.get(
          `http://localhost:5002/api/auth/getUserByEmail?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setUser((prevUser) => ({
            ...prevUser,
            ...response.data.user,
          }));
        } else {
          setUser({
            name: "John Doe",
            email: "john.doe@example.com",
            voterId: "123456",
            pinCode: "000000",
            photo: "https://via.placeholder.com/150",
            isVerified: false,
          });
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      await axios.post(
        "http://localhost:5002/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the cookies and redirect to the login page
      Cookies.remove("token");
      alert("You have been logged out successfully!");
      window.location.href = "/login"; // Redirect to login page or homepage
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("No authentication token found.");
        return;
      }

      await axios.post(
        `http://localhost:5002/api/auth/updateProfile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border"
          />
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Voter ID</label>
            <input
              type="text"
              name="voterId"
              value={user.voterId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={user.pinCode}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

