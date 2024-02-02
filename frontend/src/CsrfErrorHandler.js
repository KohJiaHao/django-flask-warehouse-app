import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CsrfErrorHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCsrfError = (error) => {
      if (error.response && error.response.status === 403) {
        // CSRF token error detected
        console.log('CSRF token error detected:', error);
        // Redirect to login page
        navigate('/login');
      }
    };

    // Add axios interceptor to handle CSRF token errors
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        handleCsrfError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove axios interceptor when component unmounts
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default CsrfErrorHandler;