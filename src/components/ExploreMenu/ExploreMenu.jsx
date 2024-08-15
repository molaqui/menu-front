import React, { useState, useEffect } from 'react';
import './ExploreMenu.css';
import CategoryService from '../../Api/CategoryService';
import { useTranslation } from 'react-i18next';  // Importation de useTranslation de i18next

function ExploreMenu({ category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();  // Utilisation de useTranslation pour accéder aux traductions

  useEffect(() => {
    // Fetch categories from the service
    CategoryService.getAllCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories', error);
      });
  }, []);

  return (
    <div className='explore-menu text-center wow fadeInUp' id='explore-menu' data-wow-delay="0.2s">
      <h1 className="section-title ff-secondary text-center text-primary fw-normal">
        {t('exploreOurMenu')}  
      </h1>
      {/* <p className="text-center mb-5">
        {t('menuDescription')}  // Utiliser t pour traduire la description
      </p> */}
      <div className="explore-menu-list wow fadeInUp" data-wow-delay="0.1s">
        {categories.map((item, index) => (
          <div
            onClick={() => setCategory(prev => (prev === item.name ? "All" : item.name))}
            key={index}
            className='explore-menu-list-item wow fadeIn'  data-wow-delay="0.2s"
          >
            <img
              className={category === item.name ? "active" : ""}
              src={item.image ? `data:image/jpeg;base64,${item.image}` : 'path/to/default-image.png'}
              alt={item.name}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
