import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { current_user } = useUserContext();

  // If there's no current_user, redirect to login
  if (!current_user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;