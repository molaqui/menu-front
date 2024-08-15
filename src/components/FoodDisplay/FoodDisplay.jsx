import React, { useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import FoodServices from '../../Api/FoodServices';
import Modal from '../../Modal/Modal';
import { useTranslation } from 'react-i18next';

const FoodDisplay = ({ category, onAddToCart }) => {
  const [foodsByCategory, setFoodsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        if (category === "All") {
          const categoriesResponse = await FoodServices.getCategories();
          const allFoodsByCategory = {};
          for (const cat of categoriesResponse.data) {
            const response = await FoodServices.getFoodsByCategoryName(cat.name);
            allFoodsByCategory[cat.name] = response.data;
          }
          setFoodsByCategory(allFoodsByCategory);
        } else {
          const response = await FoodServices.getFoodsByCategoryName(category);
          setFoodsByCategory({ [category]: response.data });
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category]);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  if (loading) {
    return (
      <div className='food-display spinner' id='food-display'>
        {/* Spinner shown here */}
      </div>
    );
  }

  return (
    <div className='food-display text-center' id='food-display'>
      <h2 className="section-title ff-secondary text-center text-primary fw-normal">{t('topDishes')}</h2>
      <div className="food-display-list">
        {Object.entries(foodsByCategory).map(([categoryName, foods], index) => (
          <div key={index} className="category-section">
            <h3 className="category-title">{categoryName}</h3>
            <div className="category-foods">
              {foods.map((item, idx) => (
                <FoodItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.images && item.images[0] ? `data:image/jpeg;base64,${item.images[0].image}` : '/path/to/default-image.jpg'}
                  delay={0.1 * idx}
                  onClick={() => {}}
                  onImageClick={() => handleFoodClick(item)}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedFood && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          food={selectedFood}
          addToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default FoodDisplay;
