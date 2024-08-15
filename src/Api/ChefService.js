import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/chefs';

const getUserId = () => {
  return Cookies.get('userId');
};

const getChefsByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const saveChef = async (chefData) => {
  const formData = new FormData();
  formData.append('name', chefData.name);
  formData.append('designation', chefData.designation);
  formData.append('image', chefData.image);
  formData.append('facebookUrl', chefData.facebookUrl);
  formData.append('instagramUrl', chefData.instagramUrl);

  const userId = getUserId();
  const response = await axios.post(`${API_URL}/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default {
  getChefsByUserId,
  saveChef,
};
