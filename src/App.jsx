import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar/Navbar';
import './App.css'

import First from './pages/First/First';
import enTranslations from './locale/en.json';
import frTranslations from './locale/fr.json';
import zhTranslations from './locale/zh.json';
import arTranslations from './locale/ar.json';


const App = () => {
  const [language, setLanguage] = useState({
    code: 'en',
    name: 'English',
    flag: 'us',
  });
  const [translations, setTranslations] = useState(enTranslations);

  const changeLanguage = (code, name, flag) => {
    const availableTranslations = {
      en: enTranslations,
      fr: frTranslations,
      zh: zhTranslations,
      ar: arTranslations,
    };

    setLanguage({ code, name, flag });
    setTranslations(availableTranslations[code]);
  };

  return (
   
    <>

      <div className="app">
        
      
        <Routes>
        <Route path="/:storeName" element={<First translations={translations}  language={language} changeLanguage={changeLanguage}/>} />
        </Routes>
      </div>
     
    </>
   
  );
};

export default App;
