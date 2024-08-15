import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/contact';

const sendContact = async (contactData) => {
  const userId = Cookies.get('userId');
  const response = await axios.post(`${API_URL}?userId=${userId}`, contactData);
  return response.data;
};

export default {
  sendContact,
};
