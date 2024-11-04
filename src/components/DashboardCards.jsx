import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaChevronRight } from 'react-icons/fa';

const DashboardCards = () => {
  const { fetchCurrentUser, currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchCurrentUser();
        const response = await api.get('cards/');
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
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-t-2 border-b-2 border-primaryGold"></div>
      </div>
    );
  }

  const handleCardDetailView = (card) => {
    navigate(`/cards/${card.id}`);
  }

  const formatCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  }

  return (
    <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
        {cardDetails.length > 0 ? (
          cardDetails.map((card) => (
            <div 
              onClick={() => handleCardDetailView(card)} 
              key={card.id} 
              className="bg-gradient-to-br from-primaryBlue to-secondBlue 
                shadow-lg hover:shadow-xl rounded-xl 
                w-full max-w-[320px] aspect-[1.6/1]
                mx-auto
                transition-all duration-300 transform 
                hover:-translate-y-1 sm:hover:-translate-y-2 
                hover:shadow-secondBlue 
                flex flex-col justify-between 
                p-4 sm:p-6 
                cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className='text-xl sm:text-2xl font-bold text-primaryGold'>GlobalOne</h2>
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
                <p className='text-lg sm:text-xl text-gray-200 font-mono'>
                  {formatCardNumber(card.card_number)}
                </p>
              </div>

              <div className="flex justify-between items-center mt-2 sm:mt-4">
                <p className='text-xs sm:text-sm text-gray-300'>Valid Thru: 12/25</p>
                <div className="text-primaryGold group-hover:translate-x-2 transition-transform duration-300">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full mx-4 sm:mx-auto text-center 
            text-gray-500 bg-white bg-opacity-10 rounded-lg 
            p-4 sm:p-8 shadow-lg 
            max-w-md"
          >
            <FaCreditCard className="text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4 text-primaryGold" />
            <p className="text-lg sm:text-xl font-semibold mb-2">No cards available</p>
            <p className="text-sm sm:text-base">You haven't added any cards yet. Add a card to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCards;