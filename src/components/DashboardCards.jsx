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
        await fetchCurrentUser(); // Fetch the current user
        const response = await api.get('cards/'); // Fetch card details
        setCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchData();
  }, []); // Add fetchCurrentUser to dependency array if it's not stable

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryGold"></div>
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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-6'>
      {cardDetails.length > 0 ? (
        cardDetails.map((card) => (
          <div 
            onClick={() => handleCardDetailView(card)} 
            key={card.id} 
            className="bg-gradient-to-br from-primaryBlue to-secondBlue shadow-2xl rounded-xl w-72 h-44 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl hover:shadow-secondBlue flex flex-col justify-between p-6 cursor-pointer group"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className='text-2xl font-bold text-primaryGold'>GlobalOne</h2>
                <p className='text-sm text-gray-300'>Premium Card</p>
              </div>
              <div className="text-primaryGold text-3xl">
                <FaCreditCard />
              </div>
            </div>

            <div className="mt-4">
              <p className='text-lg text-white font-semibold mb-2'>
                {currentUser ? currentUser.first_name : 'User'}
              </p>
              <p className='text-xl text-gray-200 font-mono'>{formatCardNumber(card.card_number)}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className='text-sm text-gray-300'>Valid Thru: 12/25</p>
              <div className="text-primaryGold group-hover:translate-x-2 transition-transform duration-300">
                <FaChevronRight />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 bg-white bg-opacity-10 rounded-lg p-8 shadow-lg">
          <FaCreditCard className="text-6xl mx-auto mb-4 text-primaryGold" />
          <p className="text-xl font-semibold mb-2">No cards available</p>
          <p>You haven't added any cards yet. Add a card to get started!</p>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;
