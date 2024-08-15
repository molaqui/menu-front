// translationService.js
import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  const url = 'https://libretranslate.com/translate';

  try {
    const response = await axios.post(url, {
      q: text,
      source: 'en',
      target: targetLanguage,
      format: 'text',
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export default translateText;
