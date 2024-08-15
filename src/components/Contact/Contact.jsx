import React, { useState, useEffect } from 'react';
import locationService from '../../Api/LocationService';
import messageService from '../../Api/MessageService.js';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';  // Import de useTranslation de i18next

function Contact() {
  const { t } = useTranslation();  // Utiliser le hook useTranslation pour accéder aux traductions
  const [mapLink, setMapLink] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (userId) {
          const locationData = await locationService.getLocationByUserId(userId);
          setMapLink(locationData.mapLink);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocation();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await messageService.saveMessage({ name, email, subject, message }, userId);
      alert(t('messageSentSuccess'));  // Utiliser t pour traduire ce message
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('errorOccured'));  // Utiliser t pour traduire ce message
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">{t('contactUs')}</h5>
          <h1 className="mb-5">{t('contactAnyQuery')}</h1>
        </div>
        <div className="row g-4">
          <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
            {mapLink ? (
              <iframe
                className="position-relative rounded w-100 h-100"
                src={mapLink}
                frameBorder="0"
                style={{ minHeight: '350px', border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            ) : (
              <p>{t('loadingMap')}</p>  // Traduction pour le chargement de la carte
            )}
          </div>
          <div className="col-md-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('yourName')}  // Traduction pour les placeholders
                        required
                      />
                      <label htmlFor="name">{t('yourName')}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('yourEmail')}
                        required
                      />
                      <label htmlFor="email">{t('yourEmail')}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t('subject')}
                        required
                      />
                      <label htmlFor="subject">{t('subject')}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder={t('leaveMessage')}
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ height: '150px' }}
                        required
                      ></textarea>
                      <label htmlFor="message">{t('message')}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">{t('sendMessage')}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
