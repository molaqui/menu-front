import React, { useEffect, useState } from 'react';
import chefService from '../../Api/ChefService';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';  // Importation de useTranslation

const Team = () => {
  const [chefs, setChefs] = useState([]);
  const userId = Cookies.get('userId');
  const { t } = useTranslation();  // Utilisation de useTranslation pour accéder aux traductions

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await chefService.getChefsByUserId(userId);
        setChefs(response);
      } catch (error) {
        console.error('Error fetching chefs:', error);
      }
    };

    fetchChefs();
  }, [userId]);

  // If there are no chefs, do not render the section
  if (chefs.length === 0) {
    return null;
  }

  return (
    <div className="container-xxl pt-5 pb-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">{t('teamMembers')}</h5>
          <h1 className="mb-5">{t('ourMasterChefs')}</h1>
        </div>
        <div className="row g-4">
          {chefs.map((chef, index) => (
            <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src={`data:image/jpeg;base64,${chef.image}`} alt={`Team Member ${index + 1}`} />
                </div>
                <h5 className="mb-0">{chef.name}</h5>
                <small>{chef.designation}</small>
                <div className="d-flex justify-content-center mt-3">
                  <a className="btn btn-square btn-primary mx-1" href={chef.facebookUrl}><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-square btn-primary mx-1" href={chef.instagramUrl}><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
