import React, { useState } from 'react';
import './FoodItem.css';

function FoodItem({ id, name, price, description, image, delay, onClick, onImageClick, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleOrderClick = () => {
    onAddToCart(id); // Notifier le parent pour mettre à jour le nombre total d'articles
    setIsAdded(true);
    console.log(`Commande passée pour l'élément: ${name}`);
    
    // Revert to initial state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1000); // 2000 milliseconds = 2 seconds
  };

  return (
    <div className='food-item wow fadeInUp' data-wow-delay={`${delay}s`} onClick={onClick}>
      <div className="food-item-img-container" onClick={(e) => { e.stopPropagation(); onImageClick(); }}>
        <img src={image} alt={name} className='food-item-image' />
        <div className="food-item-overlay-icon">
          <i className="fas fa-info-circle"></i>
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-bottom">
          <p className="food-item-price">{price} Dhs</p>
          <button
            className={`order-button ${isAdded ? 'checked' : ''}`}
            onClick={handleOrderClick}
            disabled={isAdded}
          >
            <i className={`fas ${isAdded ? 'fa-check' : 'fa-shopping-cart'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
