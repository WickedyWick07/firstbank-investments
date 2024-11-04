import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const CardCreation = () => {
  const { fetchCurrentUser, currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState(null);
  const [error, setError] = useState(null);
  const [card_type, setCardType] = useState('');
  const [account_type, setAccountType] = useState('');
  const [cardCount, setCardCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndCards = async () => {
      try {
        await fetchCurrentUser();
        const response = await api.get('cards/');
        setCardCount(response.data.length);
      } catch (error) {
        console.error('Error fetching user or cards', error);
        setError('Failed to fetch user or card data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardCount >= 3) {
      setError("You cannot create more than 3 cards");
      return;
    }

    try {
      const response = await api.post('card-creation/', { card_type, account_type, user: currentUser.id });
      setCardDetails(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating card', error.response ? error.response.data : error);
      setError('Failed to create card. Please try again.');
    }
  };

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-primaryGold"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-primaryBlue flex items-center justify-center p-4 sm:p-6 md:p-8'>
      {currentUser ? (
        <div className={`bg-white rounded-lg shadow-xl p-4 ${isMobile ? 'w-full' : isTablet ? 'max-w-[80%]' : 'max-w-3xl'} `}>
          <h1 className={`text-2xl ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-4xl'} font-bold text-center text-primaryGold mb-4`}>
            Welcome, {currentUser.first_name}
          </h1>
          
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          {cardCount < 3 ? (
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 gap-4'>
                <label className='block'>
                  <span className='text-gray-700 font-semibold text-sm'>
                    Card Type:
                  </span>
                  <select 
                    className='mt-1 p-2 text-center block w-full rounded-md font-semibold 
                    bg-primaryGold border-gray-300 shadow-sm focus:ring-primaryBlue 
                    focus:border-primaryBlue text-sm' 
                    value={card_type} 
                    onChange={(e) => setCardType(e.target.value)}
                  >
                    <option value="">Select card type</option>
                    <option value="VISA">VISA</option>
                    <option value="MASTERCARD">Mastercard</option>
                    <option value="DISCOVER">Discover</option>
                  </select>
                </label>

                <label className='block'>
                  <span className='text-gray-700 font-semibold text-sm'>
                    Account Type:
                  </span>
                  <select 
                    className='mt-1 p-2 text-center block w-full rounded-md font-semibold 
                    bg-primaryGold border-gray-300 shadow-sm focus:ring-primaryBlue 
                    focus:border-primaryBlue text-sm' 
                    value={account_type} 
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="">Select account type</option>
                    <option value="CREDIT">Credit</option>
                    <option value="DEBIT">Debit</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                </label>
              </div>

              <button 
                type="submit" 
                className='w-full bg-primaryBlue text-white font-bold py-2 px-4 
                rounded-md hover:bg-primaryGold transition-colors duration-300'
              >
                Create Card
              </button>
            </form>
          ) : (
            <p className="text-red-500 text-center text-sm">
              You cannot create more than 3 cards.
            </p>
          )}

          {cardDetails && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-primaryBlue">
                Card Details
              </h2>
              <p className="mt-3 text-gray-700 text-sm">
                Card Type: {cardDetails.card_type}
              </p>
              <p className="mt-2 text-gray-700 text-sm">
                Account Type: {cardDetails.account_type}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className='text-white text-sm'>
          User data could not be loaded.
        </p>
      )}
    </div>
  );
};

export default CardCreation;
