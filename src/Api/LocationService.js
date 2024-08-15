import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/locations';

const getUserId = () => {
  return Cookies.get('userId');
};

const saveLocation = async (mapLink) => {
  const userId = getUserId();
  const response = await axios.post(API_URL, { mapLink, userId });
  return response.data;
};

const getLocationByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const deleteLocation = async (locationId) => {
  const response = await axios.delete(`${API_URL}/${locationId}`);
  return response.data;
};

export default {
  saveLocation,
  getLocationByUserId,
  deleteLocation,
};
