import React, { useState, useEffect } from 'react';
import authService from '../../Api/AuthService';
import subscriberService from '../../Api/SubscriberService'; // Assuming you have a subscriberService
import './Footer.css';

import { useTranslation } from 'react-i18next'; // Importation de useTranslation


function Footer({storeName}) {

  const { t } = useTranslation(); // Utilisation de useTranslation pour accéder aux traductions
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState({ city: '', phone: '', email: '' });

  useEffect(() => {
    const fetchContactInfo = async () => {
      
      try {
        
        const userData = await authService.getUserByStoreName(storeName);
        setContactInfo({
          address: userData.data.city,
          phone: userData.data.phone,
          email: userData.data.email,
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubscribe = async () => {
    try {
      await subscriberService.saveSubscriber(email);
      alert(t('subscriptionSuccess')); // Traduction pour le message de succès
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert(t('subscriptionFailed')); // Traduction pour le message d'erreur
    }
  };

  return (
    <div className="footer  bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-3">
          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">{t('company')}</h4>
            <a className="btn btn-link" href="#about">{t('aboutUs')}</a>
            <a className="btn btn-link" href="#contact">{t('contactUs')}</a>
            <a className="btn btn-link" href="#book-table">{t('reservation')}</a>
            <a className="btn btn-link" href="#menu">{t('menu')}</a>
          </div>
          <div className="col-lg-4  col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">{t('contact')}</h4>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>{contactInfo.address}</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>{contactInfo.phone}</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i>{contactInfo.email}</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-instagram"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">{t('newsletter')}</h4>
            <p>{t('newsletterDesc')}</p>
            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
              <input
                className="form-control border-primary w-100 py-3 ps-4 pe-5"
                type="email"
                placeholder={t('yourEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                onClick={handleSubscribe}
              >
                {t('signUp')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#">Test Website</a>, {t('allRightsReserved')}.
              {t('designedBy')} <a className="border-bottom" href="https://lmenu-v1.netlify.app/">LMENU</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="#home">{t('home')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
