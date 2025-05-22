import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getCookie('authToken'); 

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
