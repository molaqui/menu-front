import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import VisiteService from '../../Api/VisiteService';
import CategoryService from '../../Api/CategoryService';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './spinner.css';

function First({ translations }) {
  const { storeName } = useParams();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    console.log('Store name:', storeName);

    if (storeName) {
      // Incrémenter le compteur de visites
      VisiteService.incrementVisite(storeName)
        .then(() => {
          console.log('Visit incremented successfully');
        })
        .catch((error) => {
          console.error('Error incrementing visit:', error);
        });

      // Récupérer le compteur de visites
      VisiteService.getVisitCount(storeName)
        .then((count) => {
          setVisitCount(count);
        })
        .catch((error) => {
          console.error('Failed to fetch visit count:', error);
        });

      CategoryService.getUserByStoreName(storeName)
        .then((response) => {
          if (response && response.data) {
            const user = response.data;
            const userId = user.id;
            Cookies.set('userId', userId, { expires: 1 });
            setAuthenticated(true);
          } else {
            console.error('Invalid response format:', response);
          }
        })
        .catch((error) => {
          console.error('There was an error fetching the user!', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [storeName]);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <div>Authentication failed.</div>;
  }

  return (
    <div>
      {/* Affichez le nombre de visites */}
      <Home translations={translations} />
    </div>
  );
}

export default First;
