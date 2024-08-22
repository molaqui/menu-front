import React, { useEffect, useState } from 'react';
import './Header.css';
import headerImageService from '../../Api/headerImageService';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';  // Importation de useTranslation de i18next

const Header = () => {
  const { t, i18n } = useTranslation();  // Utilisation de useTranslation pour accéder aux traductions
  const [headerImages, setHeaderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchHeaderImages = async () => {
      try {
        const images = await headerImageService.getHeaderImages();
        setHeaderImages(images);
      } catch (error) {
        console.error('Error fetching header images:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchHeaderImages();
  }, []);

  useEffect(() => {
    if (headerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [headerImages]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? headerImages.length - 1 : prevIndex - 1
    );
  };

  // Don't render anything until we know if there are header images or not
  if (loading) return null;

  return (
    <div className={`hero-header ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      {headerImages.length === 0 ? (
        <div className="hero-slide active" style={{
          background: 'linear-gradient(rgba(15, 23, 43, .9), rgba(15, 23, 43, .9)), url(/img/bg-hero.jpg)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh'
        }}>
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="container my-5 py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="display-3 text-white animated slideInLeft">{t('enjoyOurDeliciousMeal')}</h1>
                <p className="text-white animated slideInLeft mb-4 pb-2">
                  {t('headerSubtitle')}
                </p>
                <a href="#book-table" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">{t('bookATable')}</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        headerImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              background: `linear-gradient(rgba(15, 23, 43, .9), rgba(15, 23, 43, .9)), url(data:image/jpeg;base64,${image.bgImage})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '100vh',
              display: index === currentIndex ? 'block' : 'none',
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container my-5 py-5">
              <div className="row align-items-center g-5">
                <div className={`col-lg-6 text-center text-lg-start ${i18n.language === 'ar' ? 'text-lg-end' : ''}`}>
                  <h1 className="display-3 text-white animated slideInLeft">{image.title}</h1>
                  <p className="text-white animated slideInLeft mb-4 pb-2">{image.subtitle}</p>
                  <a href="#book-table" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">{t('bookATable')}</a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {headerImages.length > 1 && (
        <>
          <button className="prev-slide" onClick={prevSlide}>❮</button>
          <button className="next-slide" onClick={nextSlide}>❯</button>
        </>
      )}
    </div>
  );
};

export default Header;
