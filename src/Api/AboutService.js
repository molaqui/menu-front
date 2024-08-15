import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://spring-menu-production.up.railway.app/api/about';

const getUserId = () => {
  return Cookies.get('userId');
};

const getAbout = async () => {
  const userId = getUserId();
  const response = await axios.get(API_URL, {
    params: { userId }
  });
  return response.data;
};

const saveAbout = async (aboutData, images) => {
  const userId = getUserId();
  const formData = new FormData();
  formData.append('title', aboutData.title);
  formData.append('subtitle', aboutData.subtitle);
  formData.append('description', aboutData.description);
  formData.append('yearsOfExperience', aboutData.yearsOfExperience);
  formData.append('numberOfChefs', aboutData.numberOfChefs);
  formData.append('image1', images.image1);
  formData.append('image2', images.image2);
  formData.append('image3', images.image3);
  formData.append('image4', images.image4);
  formData.append('userId', userId);

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  getAbout,
  saveAbout,
};
