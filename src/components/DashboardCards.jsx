import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';

const DashboardCards = () => {
  const { fetchCurrentUser, currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await fetchCurrentUser(); // Fetch the current user
        const response = await api.get('cards/'); // Fetch card details
        setCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryGold"></div>
      </div>
    );
  }

  const handleCardDetailView = (card) => {
    navigate(`/cards/${card.id}`);
  };

  const formatCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {cardDetails.length > 0 ? (
        cardDetails.map((card) => (
          <div 
            onClick={() => handleCardDetailView(card)} 
            key={card.id} 
            className="bg-gradient-to-br from-primaryBlue to-secondBlue shadow-lg rounded-xl w-full h-44 sm:h-48 lg:h-52 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between p-4 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-primaryGold'>GlobalOne</h2>
                <p className='text-xs sm:text-sm text-gray-300'>Premium Card</p>
              </div>
              <div className="text-primaryGold text-2xl sm:text-3xl">
                <FaCreditCard />
              </div>
            </div>

            <div className="mt-2 sm:mt-4">
              <p className='text-base sm:text-lg text-white font-semibold mb-1 sm:mb-2'>
                {currentUser ? currentUser.first_name : 'User'}
              </p>
              <p className='text-sm sm:text-xl text-gray-200 font-mono'>{formatCardNumber(card.card_number)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400">
          No cards found.
        </div>
      )}
    </div>
  );
};

export default DashboardCards;
