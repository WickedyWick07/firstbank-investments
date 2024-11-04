import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const TransactionForm = ({ cardId }) => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Media queries for responsive design
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get(`/cards/${cardId}/`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch balance', error);
      setError('Failed to load balance');
    }
  };

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    await handleTransaction('withdraw');
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    await handleTransaction('deposit');
  };

  const handleTransaction = async (transactionType) => {
    setError(null);
    setSuccessMessage('');

    try {
      const response = await api.post(`/${transactionType}/`, {
        card_id: cardId,
        amount: parseFloat(amount),
        transactionType
      });
      setSuccessMessage(response.data.message);
      updateBalance(response.data.new_balance);
      navigate('/transaction/history');
    } catch (error) {
      console.error('Something went wrong', error);
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  // Determine the maximum width of the container based on device size
  const containerClass = isDesktop ? 'max-w-md' : isTablet ? 'max-w-sm' : 'max-w-xs';
  const buttonClass = isDesktop ? 'py-2 px-4' : 'py-1 px-2'; // Adjust button padding for different screen sizes

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue flex items-center justify-center p-4">
      <div className={`bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg p-6 rounded-lg w-full ${containerClass}`}>
        <h3 className="text-2xl font-bold text-primaryGold mb-4">Make a Transaction</h3>
        <p className="mb-4 text-gray-700">Current Balance: <span className="font-bold">${balance}</span></p>
        <form>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryGold"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleWithdraw}
              className={`bg-red-500 hover:bg-red-600 text-white font-bold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300 ${buttonClass}`}
            >
              Withdraw
            </button>
            <button
              type="button"
              onClick={handleDeposit}
              className={`bg-green-500 hover:bg-green-600 text-white font-bold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 ${buttonClass}`}
            >
              Deposit
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default TransactionForm;
