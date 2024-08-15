import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, food, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.className === 'modal-overlay') {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    if (food && food.images && food.images.length > 0) {
      setCurrentImageIndex(0); // Reset to the first image when a new food item is selected
    }
  }, [food]);

  if (!isOpen || !food) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % food.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? food.images.length - 1 : prevIndex - 1
    );
  };

  const currentImage = food.images[currentImageIndex];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-image-container">
          {food.images.length > 1 && (
            <button className="nav-button prev-button" onClick={prevImage}>
              &#9664;
            </button>
          )}
          <img
            src={`data:image/jpeg;base64,${currentImage.image}`}
            alt={food.name}
            className="modal-food-image"
          />
          {food.images.length > 1 && (
            <button className="nav-button next-button" onClick={nextImage}>
              &#9654;
            </button>
          )}
        </div>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">Price: {food.price} Dhs</p>
        {/* Uncomment the button if needed */}
        {/* <button className="add-to-cart-button" onClick={() => addToCart(food.id)}>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
