import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (role && decoded.user.role !== role) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
