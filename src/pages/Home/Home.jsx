import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Cookies from 'js-cookie';
import foodService from '../../Api/FoodServices';

import OrderService from '../../Api/OrderService';
import About from '../../components/About/About';
import BookTable from '../../components/BookTable/BookTable';
import Team from '../../components/Team/Team';
import Contact from '../../components/Contact/Contact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Service from '../Service/Service';
import tokenService from '../../Api/tokenService';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer/Footer';

function Home({ translations,storeName }) {
  const [category, setCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [tableNumber, setTableNumber] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const tokenFromUrl = queryParams.get('token');

  const { t } = useTranslation();

  useEffect(() => {
    if (tokenFromUrl) {
      tokenService.verifyToken(tokenFromUrl)
        .then(response => {
          setTableNumber(response);
        })
        .catch(() => {
          alert(t('invalidToken'));
        });
    }
  }, [tokenFromUrl, t]);

  const animationProps = useSpring({
    transform: isCartOpen ? `translateY(0%)` : `translateY(100%)`,
    opacity: isCartOpen ? 1 : 0,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (isCartOpen && !event.target.closest('.cart-popup') && !event.target.closest('.cart-button')) {
        setIsCartOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      const orders = Cookies.get('orders') ? JSON.parse(Cookies.get('orders')) : [];
      const fetchFoodDetails = async () => {
        const details = await Promise.all(orders.map(id => {
          const userId = Cookies.get('userId');
          return foodService.getFoodById(id, userId).then(res => res.data);
        }));
        setFoodDetails(details);
      };
      fetchFoodDetails();
    }
  }, [isCartOpen]);

  useEffect(() => {
    const orders = Cookies.get('orders') ? JSON.parse(Cookies.get('orders')) : [];
    setTotalItems(orders.length);
  }, [foodDetails]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleConfirmOrder = () => {
    if (!tableNumber && (!customerName || !customerPhone || !customerAddress)) {
      setIsPopupOpen(true);
      return;
    }

    const order = {
      tableNumber: tableNumber,
      customerName: customerName || "",
      customerPhone: customerPhone || "",
      customerAddress: customerAddress || "",
      orderType: tableNumber ? "table" : "delivery",
      total: parseFloat(calculateTotalPrice()),
      items: foodDetails.map(food => ({
        foodId: food.id,
        foodName: food.name,
        quantity: food.quantity || 1,
        price: food.price
      }))
    };

    setIsOrdering(true);
    OrderService.createOrder(order).then(response => {
      toast.success(t('orderSuccess'));
      Cookies.remove('orders');
      setFoodDetails([]);
      setIsCartOpen(false);
      setIsOrdering(false);
    }).catch(error => {
      toast.error(t('orderError'));
      console.error("Error placing the order", error.response?.data || error.message);
      setIsOrdering(false);
    });
  };

  const handleRemoveItem = (id) => {
    const updatedOrders = foodDetails.filter(food => food.id !== id);
    Cookies.set('orders', JSON.stringify(updatedOrders.map(food => food.id)), { expires: 7 });
    setFoodDetails(updatedOrders);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedDetails = foodDetails.map(food => {
      if (food.id === id) {
        const newQuantity = Math.max((food.quantity || 1) + delta, 1);
        return { ...food, quantity: newQuantity };
      }
      return food;
    });
    setFoodDetails(updatedDetails);
    Cookies.set('orders', JSON.stringify(updatedDetails.map(food => food.id)), { expires: 7 });
  };

  const handleAddToCart = (id) => {
    const currentOrders = Cookies.get('orders') ? JSON.parse(Cookies.get('orders')) : [];
    Cookies.set('orders', JSON.stringify([...currentOrders, id]), { expires: 7 });
    setTotalItems(currentOrders.length + 1);
  };

  const calculateTotalPrice = () => {
    return foodDetails.reduce((total, food) => {
      const quantity = food.quantity || 1;
      return total + (food.price * quantity);
    }, 0).toFixed(2);
  };

  const handlePopupConfirm = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert(t('fillAllFields'));
      return;
    }

    if (customerPhone.length < 10) {
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
    setIsPopupOpen(false);
    handleConfirmOrder();
  };

  return (
    <div>
      <Header tableNumber={tableNumber}/>
      <div id="menu">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <div id="foods">
        <FoodDisplay category={category} onAddToCart={handleAddToCart} />
      </div>
      <div id="service">
        <Service />
      </div>
      <div id="about">
        <About translations={translations} />
      </div>
      <div id="book-table">
        <BookTable />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer storeName={storeName}/>
      
      <button className="cart-button" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>
      {isCartOpen && (
        <animated.div className="cart-popup" style={animationProps}>
          <div className="cart-popup-header">
            <h3>{t('cart')}</h3>
            <button className="close-button" onClick={() => setIsCartOpen(false)}>×</button>
          </div>
          <div className="cart-items-container">
            {foodDetails.length === 0 ? (
              <p>{t('emptyCart')}</p>
            ) : (
              <ul>
                {foodDetails.map((food, index) => (
                  <li key={index} className="cart-item">
                    {food.images && food.images.length > 0 ? (
                      <img
                        src={`data:image/jpeg;base64,${food.images[0].image}`} // Use the first image
                        alt={food.name}
                        className="cart-item-image"
                      />
                    ) : (
                      <img
                        src="/path/to/default-image.jpg" // Fallback image path
                        alt="Default"
                        className="cart-item-image"
                      />
                    )}
                    <div className="cart-item-details">
                      <p className="cart-item-name">{food.name}</p>
                      <p className="cart-item-price">{food.price} Dhs</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(food.id, -1)} className="quantity-button">-</button>
                      <span>{food.quantity || 1}</span>
                      <button onClick={() => handleQuantityChange(food.id, 1)} className="quantity-button">+</button>
                    </div>
                    <button className="remove-button" onClick={() => handleRemoveItem(food.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {foodDetails.length > 0 && (
            <>
              <div className="cart-total">
                <p>{t('total')}: <span>{calculateTotalPrice()} Dhs</span></p>
              </div>
            </>
          )}
          <button className="confirm-button" onClick={handleConfirmOrder} disabled={isOrdering || foodDetails.length === 0}>
            {isOrdering ? t('placingOrder') : <><i className="fas fa-check"></i> {t('placeOrder')}</>}
          </button>
        </animated.div>
      )}

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
          
            <div className="popup-header">
            <button className="close-popup-button" onClick={() => setIsPopupOpen(false)}>×</button>
              <span><h2>{t('deliveryInfo')}</h2></span>
              
            </div>
            <div className="popup-content">
              <input
                type="text"
                placeholder={t('name')}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="number"
                placeholder={t('phone')}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className={phoneError ? 'error' : ''}
              />
              {phoneError && <p className="error-message">{t('phoneError')}</p>}
              <input
                type="text"
                placeholder={t('address')}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              <button onClick={handlePopupConfirm}>{t('confirm')}</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Home;
