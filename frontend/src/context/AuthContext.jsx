import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
  }, [token]);
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  return (<AuthContext.Provider value={{ user, token, isAdmin: user?.role === 'admin', login, logout }}>
    {children}
  </AuthContext.Provider>);
};