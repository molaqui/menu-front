import React, { createContext, useState, useEffect } from 'react';
import categoryService from './axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const getUserByStoreName = (storeName) => {
    categoryService.getUserByStoreName(storeName)
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => {
        console.error("There was an error fetching the user!", error);
      });
  };

  return (
    <UserContext.Provider value={{ userId, getUserByStoreName }}>
      {children}
    </UserContext.Provider>
  );
};
