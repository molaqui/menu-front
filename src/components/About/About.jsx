import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importation de useTranslation de i18next
import AboutService from '../../Api/AboutService';
import { useParams } from 'react-router-dom';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const { storeName } = useParams();
  const { t } = useTranslation(); // Utilisation de useTranslation pour accéder aux traductions

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await AboutService.getAbout();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return null;
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              {/* Images avec animations zoom */}
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.1s"
                  src={`data:image/jpeg;base64,${aboutData.image1}`}
                  alt="About 1"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.3s"
                  src={`data:image/jpeg;base64,${aboutData.image2}`}
                  style={{ marginTop: '25%' }}
                  alt="About 2"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.5s"
                  src={`data:image/jpeg;base64,${aboutData.image3}`}
                  alt="About 3"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src={`data:image/jpeg;base64,${aboutData.image4}`}
                  alt="About 4"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              {t('aboutUs')}
            </h5>
            <h1 className="mb-4">
              {t('welcomeTo')} <i className="fa fa-utensils text-primary me-2"></i>
              {storeName}
            </h1>
            <p className="mb-4">{aboutData.description}</p>
            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    {aboutData.yearsOfExperience}
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">{t('yearsOf')}</p>
                    <h6 className="text-uppercase mb-0">{t('experience')}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    {aboutData.numberOfChefs}
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">{t('popular')}</p>
                    <h6 className="text-uppercase mb-0">{t('masterChefs')}</h6>
                  </div>
                </div>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="/">
              {t('readMore')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
