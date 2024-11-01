import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import AuthContext from '../../context/AuthContext';
import Header from './Header';
import SideMenu from './SideMenu';
import TransactionForm from './TransactionForm';
import { FaCreditCard } from 'react-icons/fa';
import mastercard from '../assets/images/mastercard-logo.png'



const CardDetailView = () => {
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCurrentUser, currentUser } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await api.get(`cards/${id}`);
        setCardDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching the card details', error);
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
    fetchCardDetails();
  }, [id]);


  if (isLoading) {
    return (
      <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryGold"></div>
      </div>
    );
  }
  if (!cardDetails) return <div className="text-white text-center py-4">No Card Details...</div>;

  const toggleTransactionForm = () => {
    setIsFormOpen(prevState => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col">
      <Header />

      <section className="flex flex-1 p-6">
        <SideMenu />
        <div className="flex-1 p-6 space-y-6">
          <h1 className="text-3xl text-primaryGold font-bold mb-4 underline">Card Details</h1>

          <div className="max-w-md mx-auto bg-gradient-to-r from-primaryBlue to-secondBlue shadow-xl p-6 rounded-lg flex flex-col">
           

            
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className='text-xl font-bold text-primaryGold'>GlobalOne</h2>
                <p className='text-sm text-gray-300 font-semibold'>FirstBank Ltd</p>
              </div>
              <div>
                <FaCreditCard className="w-8 h-8 text-gray-200" />
              </div>
            </div>

            <div>
              <p className='text-lg font-semibold text-gray-100'>Account Number: {cardDetails.card_number}</p>
              <div className="flex justify-between items-center mt-4">
                <p className='text-white font-semibold'>{cardDetails.account_type}</p>
              <img src={mastercard} alt="MasterCard" className="w-12"/>
              </div>
            
            </div>
          </div>
        

          <div className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg rounded-lg p-6">
            <h2 className="text-xl text-white font-bold mb-4">Account Information</h2>
            <div className="space-y-2 text-white">
              <p className="text-lg font-medium">
                <span className="font-semibold">Account Holder:</span> {currentUser.username}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Account Number:</span> {cardDetails.card_number}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Account Type:</span> {cardDetails.account_type}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Card Type:</span> {cardDetails.card_type}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Expiration Date:</span> {cardDetails.expiration_date}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Account Active:</span> {cardDetails.is_active ? 'True' : 'False'}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">Balance:</span> {cardDetails.balance}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button 
              onClick={toggleTransactionForm} 
              className="bg-primaryGold text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            >
              Transact
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-gradient-to-r from-primaryBlue to-secondBlue p-8 rounded-lg shadow-lg relative">
                <button
                  onClick={toggleTransactionForm}
                  className="absolute top-2 right-2 text-red-500 font-bold text-lg"
                >
                  &times;
                </button>
                <TransactionForm cardId={id} />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CardDetailView;
