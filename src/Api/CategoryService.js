import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/';

const getUserByStoreName = (storeName) => {
  
  return axios.get(`${API_URL}auth/user/store/${storeName}`);
};

const getAllCategories = () => {
  const userId = Cookies.get('userId');
  return axios.get(`${API_URL}categories/${userId}`);
};

const uploadImage = (image, name) => {
  const userId = Cookies.get('userId');
  const formData = new FormData();
  formData.append('image', image);
  formData.append('name', name);

  return axios.post(`${API_URL}categories/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      userId: userId
    }
  });
};

const getAllCategoryNames = () => {
  const userId = Cookies.get('userId');
  return axios.get(`${API_URL}categories/names/${userId}`);
};

export default {
  getUserByStoreName,
  getAllCategories,
  uploadImage,
  getAllCategoryNames,
};
