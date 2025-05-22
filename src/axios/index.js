// axiosConfig.js
import axios from 'axios';

// Function to get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

axios.interceptors.request.use(
  config => {
    const token = getCookie('authToken'); // Retrieve the token from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


axios.defaults.withCredentials = true;

export default axios;