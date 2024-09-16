// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context
const UserContext = createContext();

// Custom hook for using UserContext
export const useUserContext = () => useContext(UserContext);

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [pincode, setPincode] = useState('');
  const [userId, setUserID] = useState('');

  return (
    <UserContext.Provider value={{ pincode, setPincode , userId , setUserID}}>
      {children}
    </UserContext.Provider>
  );
};
