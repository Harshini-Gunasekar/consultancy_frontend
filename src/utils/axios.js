// src/utils/axios.js
import axios from 'axios';

// Set up the base URL for your API (change this to your backend's URL)
const axiosInstance = axios.create({
  baseURL: 'https://consultancy-backend-6.onrender.com/api', // Update this to match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for handling requests or responses globally if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can add any request modifications here like token in header
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors here
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
