import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const API_URL = 'https://spring-menu-production.up.railway.app/api';

// Helper function to get userId from cookies
const getUserId = () => {
  return Cookies.get('userId');
};

const createOrder = (order) => {
  const userId = getUserId();
  return axios.post(`${API_URL}/orders/create`, order, {
    params: { userId }
  });
};

const verifyToken = (token) => {
  return axios.get(`${API_URL}/tokens/verify`, {
    params: { token }
  });
};

const generateToken = (tableNumber) => {
  const userId = getUserId();
  return axios.post(`${API_URL}/tokens/generate`, { tableNumber }, {
    params: { userId }
  });
};

export default {
  createOrder,
  verifyToken,
  generateToken
};
