import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import CardComponent from './CardComponent';

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
        <div className='bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-[90%] sm:max-w-[80%] md:max-w-3xl'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primaryGold mb-4 sm:mb-6 md:mb-8'>
            Welcome, {currentUser.first_name}
          </h1>
          
          {error && (
            <p className="text-red-500 text-sm sm:text-base text-center mb-3 sm:mb-4">
              {error}
            </p>
          )}

          {cardCount < 3 ? (
            <form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                <label className='block'>
                  <span className='text-gray-700 font-semibold text-sm sm:text-base'>
                    Card Type:
                  </span>
                  <select 
                    className='mt-1 p-2 text-center block w-full rounded-md font-semibold 
                    bg-primaryGold border-gray-300 shadow-sm focus:ring-primaryBlue 
                    focus:border-primaryBlue text-sm sm:text-base' 
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
                  <span className='text-gray-700 font-semibold text-sm sm:text-base'>
                    Account Type:
                  </span>
                  <select 
                    className='mt-1 p-2 text-center block w-full rounded-md font-semibold 
                    bg-primaryGold border-gray-300 shadow-sm focus:ring-primaryBlue 
                    focus:border-primaryBlue text-sm sm:text-base' 
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
                className='w-full bg-primaryBlue text-white font-bold py-2 sm:py-3 px-4 
                rounded-md hover:bg-primaryGold transition-colors duration-300
                text-sm sm:text-base'
              >
                Create Card
              </button>
            </form>
          ) : (
            <p className="text-red-500 text-center text-sm sm:text-base">
              You cannot create more than 3 cards.
            </p>
          )}

          {cardDetails && (
            <div className="mt-6 sm:mt-8 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-primaryBlue">
                Card Details
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base">
                Card Type: {cardDetails.card_type}
              </p>
              <p className="mt-2 text-gray-700 text-sm sm:text-base">
                Account Type: {cardDetails.account_type}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className='text-white text-sm sm:text-base'>
          User data could not be loaded.
        </p>
      )}
    </div>
  );
};

export default CardCreation;