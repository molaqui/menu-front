import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AuthService from '../../Api/AuthService';
import './Navbar.css';
import 'flag-icon-css/css/flag-icons.min.css';
import Cookies from "js-cookie";
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [activeButton, setActiveButton] = useState('home');
  const [activeLang, setActiveLang] = useState({ code: 'en', flag: 'us', name: 'English' });
  const [user, setUser] = useState(null);
  const { storeName } = useParams();

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      fetchUserById(userId);
      
    }
  }, []);
  
  const fetchUserById = async (userId) => {
    try {
      const userData = await AuthService.getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
    }
  };
  
  

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const changeLanguage = (langCode, flag, name) => {
    i18n.changeLanguage(langCode);
    setActiveLang({ code: langCode, flag: flag, name: name });
  };

  return (
    <div className="position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
        <div href="/" className="navbar-brand p-0">
          {user && user.logo ? (
            <img src={`data:image/jpeg;base64,${user.logo}`} alt="Store Logo" style={{ height: '200px' }} />
          ) : (
            <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
          )}
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <a href="#home" className={`nav-item nav-link ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
              {t('home')}
            </a>
            <a href="#about" className={`nav-item nav-link ${activeButton === 'about' ? 'active' : ''}`} onClick={() => handleButtonClick('about')}>
              {t('about')}
            </a>
            <a href="#service" className={`nav-item nav-link ${activeButton === 'service' ? 'active' : ''}`} onClick={() => handleButtonClick('service')}>
              {t('service')}
            </a>
            <a href="#menu" className={`nav-item nav-link ${activeButton === 'menu' ? 'active' : ''}`} onClick={() => handleButtonClick('menu')}>
              {t('menu')}
            </a>
            <a href="#contact" className={`nav-item nav-link ${activeButton === 'contact' ? 'active' : ''}`} onClick={() => handleButtonClick('contact')}>
              {t('contact')}
            </a>
          </div>
          <div className="dropdown ms-4">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <span className={`flag-icon flag-icon-${activeLang.flag}`}></span> {activeLang.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="languageDropdown">
              <li><button className="dropdown-item" onClick={() => changeLanguage('en', 'us', 'English')}><span className="flag-icon flag-icon-us"></span> English</button></li>
              <li><button className="dropdown-item" onClick={() => changeLanguage('fr', 'fr', 'Français')}><span className="flag-icon flag-icon-fr"></span> Français</button></li>
              <li><button className="dropdown-item" onClick={() => changeLanguage('zh', 'cn', '中文')}><span className="flag-icon flag-icon-cn"></span> 中文</button></li>
              <li><button className="dropdown-item" onClick={() => changeLanguage('ar', 'ma', 'العربية')}><span className="flag-icon flag-icon-ma"></span> العربية</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
