// MessageService.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/messages';

const getUserId = () => {
  return Cookies.get('userId');
};

const saveMessage = async (message, userId) => {
  if (!userId) throw new Error('User ID is undefined');
  const response = await axios.post(API_URL, message, { params: { userId } });
  return response.data;
};

const getMessagesByUserId = async (userId) => {
  const response = await axios.get(API_URL, { params: { userId } });
  return response.data;
};

// New delete function
const deleteMessageById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  saveMessage,
  getMessagesByUserId,
  deleteMessageById,
};
