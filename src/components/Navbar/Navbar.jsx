import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthService from '../../Api/AuthService';
import './Navbar.css';
import 'flag-icon-css/css/flag-icons.min.css';

export default function Navbar({ storeName }) {
  const { t, i18n } = useTranslation();
  const [activeButton, setActiveButton] = useState('home');
  const [activeLang, setActiveLang] = useState({ code: 'en', flag: 'us', name: 'English' });
  const [contactInfo, setContactInfo] = useState({ logo: '' });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const userData = await AuthService.getUserByStoreName(storeName);
        setContactInfo({
          logo: userData.data.logo,
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, [storeName]);

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
        <a href="/" className="navbar-brand p-0">
          {contactInfo && contactInfo.logo ? (
            <img src={`data:image/jpeg;base64,${contactInfo.logo}`} alt="Store Logo" style={{ height: '200px' }} />
          ) : (
            <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>LMENU</h1>
          )}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            {['home', 'about', 'service', 'menu', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-item nav-link ${activeButton === item ? 'active' : ''}`}
                onClick={() => handleButtonClick(item)}
              >
                {t(item)}
              </a>
            ))}
          </div>
        </div>
        <div className="dropdown ms-auto me-auto">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <span className={`flag-icon flag-icon-${activeLang.flag}`}></span> {activeLang.name}
          </button>
          <ul className="dropdown-menu" aria-labelledby="languageDropdown">
            {[
              { code: 'en', flag: 'us', name: 'English' },
              { code: 'fr', flag: 'fr', name: 'Français' },
              { code: 'zh', flag: 'cn', name: '中文' },
              { code: 'ar', flag: 'ma', name: 'العربية' },
            ].map((lang) => (
              <li key={lang.code}>
                <button className="dropdown-item" onClick={() => changeLanguage(lang.code, lang.flag, lang.name)}>
                  <span className={`flag-icon flag-icon-${lang.flag}`}></span> {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
