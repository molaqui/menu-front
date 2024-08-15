import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

const API_URL = 'https://spring-menu-production.up.railway.app/api/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, null, {
    params: { email, password }
  });
  if (response.data) {
    const user = response.data;
    Cookies.set('userId', user.id, { expires: 1 }); // Store userId in a cookie for 1 day
    sessionStorage.setItem('token', 'dummy-token'); // Store token for example purposes
    return user;
  }
  return null;
};

const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, null, {
    params: { email }
  });
};

const getUserByStoreName = (storeName) => {
  return axios.get(`${API_URL}/user/store/${storeName}`);
};

const addUser = (user, logoFile) => {
  const formData = new FormData();
  formData.append('user', JSON.stringify(user));
  if (logoFile) {
    formData.append('logo', logoFile);
  }

  return axios.post(`${API_URL}/user`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getLogoByStoreName = (storeName) => {
  return axios.get(`${API_URL}/user/store/${storeName}/logo`);
};

const updateUser = (userId, user, logoFile) => {
  const formData = new FormData();
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('storeName', user.storeName);
  formData.append('phone', user.phone);
  formData.append('city', user.city);
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('websiteUrl', user.websiteUrl);
  if (logoFile) {
    formData.append('logo', logoFile);
  }
  
  return axios.put(`${API_URL}/user/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/user/${userId}`);
};

const getLogo = (userId) => {
  return axios.get(`${API_URL}/user/${userId}/logo`, {
    responseType: 'blob' // To handle image file response
  });
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user by ID failed:', error);
    throw new Error('User not found.');
  }
};
export default {
  login,
  forgotPassword,
  getUserByStoreName,
  addUser,
  updateUser,
  deleteUser,
  getLogo,
  getLogoByStoreName,
  getUserById
};
