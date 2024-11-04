import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaChevronRight } from 'react-icons/fa';
import mastercard from '../assets/images/mastercard-logo.png'



const CardComponent = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await api.get('cards/');
        setCardDetails(response.data);
      } catch (error) {
        console.error('Error fetching the card details', error);
      }finally{
        setIsLoading(false)
      }
    };

    fetchCardDetails();
  
  }, []);

  const handleCardDetailView = (card) => {
    navigate(`/cards/${card.id}`);
  };

  
  if (isLoading) {
    return (
      <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryGold"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cardDetails.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardDetailView(card)}
            className="bg-gradient-to-r from-primaryBlue to-secondBlue shadow-lg rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className='text-xl font-bold text-primaryGold'>GlobalOne</h2>
                <p className='text-sm text-gray-300'>FirstBank</p>
              </div>
              <div>
                <FaCreditCard className="w-8 h-8 text-gray-200" />
              </div>
            </div>

            <div>
              <p className='text-lg text-gray-100'>Account Number: {card.card_number}</p>
              <div className="flex justify-between items-center mt-4">
                <p className='text-white font-semibold'>{card.account_type}</p>
              <img src={mastercard} alt="MasterCard" className="w-12"/>
              </div>
            
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardDetails.map((card) => (
          <div key={card.id} className="bg-gradient-to-r from-primaryBlue to-[#004c99] p-6 border border-gray-300 rounded-lg shadow-md">
            <p className="text-lg font-semibold  text-primaryGold mb-2">
              Expiry Date: {card.expiration_date}
            </p>
            <p className="text-lg font-semibold text-primaryGold mb-2">
              CVV: {card.cvv}
            </p>
            <p className="text-lg font-semibold text-primaryGold mb-2">
              Status: {card.is_active ? 'Active' : 'Inactive'}
            </p>
            <p className="text-lg font-semibold text-primaryGold mb-2">
              Balance: ${card.balance}
            </p>
            <p className="text-lg font-semibold text-primaryGold">
              Account Type: {card.account_type}
            </p>
          </div>
        ))}
      </section>

      <hr className="my-8 border-t border-gray-300" />
    </div>
  );
};

export default CardComponent;
