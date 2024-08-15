import axios from 'axios';
import Cookies from 'js-cookie';
import tokenService from './tokenService';

const API_URL = 'https://spring-menu-production.up.railway.app/api/subscribers';

const getUserId = () => {
  return Cookies.get('userId');
};

const saveSubscriber = async (email) => {
  const userId = tokenService.getUserId();
  const response = await axios.post(API_URL, null, {
    params: { email, userId }
  });
  return response.data;
};

const getAllSubscribers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteSubscriber = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  saveSubscriber,
  getAllSubscribers,
  deleteSubscriber,
};
