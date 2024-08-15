import React, { useState, useEffect } from 'react';
import ReservationService from '../../Api/ReservationService';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import Cookies from 'js-cookie';
import './BookTable.css';
import { useTranslation } from 'react-i18next'; // Importation de useTranslation de i18next

function BookTable() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [message, setMessage] = useState('');
  const { t, i18n } = useTranslation(); // Utilisation de useTranslation pour accéder aux traductions

  useEffect(() => {
    // Here you can set language based on user selection in Navbar
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    i18n.changeLanguage(savedLanguage); // Changement de la langue en utilisant i18n
  }, [i18n]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = Cookies.get('userId');

    if (!userId) {
      alert(t('userNotLoggedIn')); // Ajout de traduction pour l'alerte
      return;
    }

    const reservation = {
      name,
      phone,
      datetime: moment(datetime).format('YYYY-MM-DD HH:mm'),
      numberOfPeople: parseInt(numberOfPeople),
      message,
      userId: parseInt(userId),
    };

    ReservationService.bookTable(reservation)
      .then(response => {
        console.log('Reservation successful:', response.data);
        alert(t('reservationSuccessful')); // Utilisation de la traduction pour les alertes
        // Clear form fields after successful reservation
        setName('');
        setPhone('');
        setDatetime('');
        setNumberOfPeople('');
        setMessage('');
      })
      .catch(error => {
        console.error('There was an error making the reservation:', error);
        alert(t('reservationError')); // Utilisation de la traduction pour les alertes
      });
  };

  return (
    <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
      <div className="row g-0">
        <div className="col-md-6">
          <div className="video">
            <button
              type="button"
              className="btn-play"
              data-bs-toggle="modal"
              data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
              data-bs-target="#videoModal">
              <span></span>
            </button>
          </div>
        </div>
        <div className="col-md-6 bg-dark d-flex align-items-center">
          <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">{t('reservation')}</h5>
            <h1 className="text-white mb-4">{t('bookTableOnline')}</h1>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Autres éléments du formulaire avec les traductions intégrées */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder={t('yourName')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">{t('yourName')}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      placeholder={t('yourPhone')}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">{t('yourPhone')}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating date">
                    <Datetime
                      value={datetime}
                      onChange={(date) => setDatetime(date)}
                      dateFormat="YYYY-MM-DD"
                      timeFormat="HH:mm"
                      inputProps={{ className: 'form-control datetimepicker-input', placeholder: t('dateTime') }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="numberOfPeople"
                      placeholder={t('numberOfPeople')}
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                    />
                    <label htmlFor="numberOfPeople">{t('numberOfPeople')}</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder={t('specialRequest')}
                      id="message"
                      style={{ height: '100px' }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label htmlFor="message">{t('specialRequest')}</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">{t('bookNow')}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
