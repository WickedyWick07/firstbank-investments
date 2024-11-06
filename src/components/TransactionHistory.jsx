import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const TransactionHistory = () => {
    const [transactionHistory, setTransactionHistory] = useState([]);
    const { fetchCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  
  
    const toggleSideMenu = () => {
      setIsSideMenuOpen(!isSideMenuOpen);
    };

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            setIsLoading(true)
            try {
                const response = await api.get('/transactions/history/');
                setTransactionHistory(response.data);
            } catch (error) {
                console.error('Failed to fetch transaction data:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchCurrentUser();
        fetchTransactionHistory();
    }, []);

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    
  if (isLoading) {
    return (
      <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryGold"></div>
      </div>
    );
  }



    return (
        <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col'>
            <Header />

            <div className='flex flex-1'>
            {(isMobile || isTablet) && (
        <button
          onClick={toggleSideMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-primaryGold rounded-lg shadow-lg"
        >
          {isSideMenuOpen ? (
            <IoClose className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      )}
      <aside
          className={`
            ${(isMobile || isTablet)
              ? 'fixed left-0 top-0 h-full w-64 hover:bg-gradient-to-br from-primaryBlue to-secondBlue bg-primaryBlue bg-opacity-80 shadow-lg z-40'
              : 'relative w-64'
            }
            transition-transform duration-300 ease-in-out
            ${(isMobile || isTablet) && !isSideMenuOpen ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          <SideMenu />
        </aside>
                <div className='flex-1 p-6'>
                    <h1 className='text-3xl font-bold text-primaryGold mb-6'>Transaction History</h1>
                    {transactionHistory.length > 0 ? (
                       <div className='space-y-6'>
                       {transactionHistory.map((transaction, index) => (
                         <div
                           key={index}
                           className="bg-gradient-to-r from-primaryBlue to-[#004c99] p-6 rounded-lg shadow-2xl border cursor-pointer transition-transform transform  hover:shadow-xl hover:border-yellow-400"
                         >
                           <div className='flex flex-col space-y-4'>
                             <p className="text-white text-lg uppercase">
                               <strong className='text-yellow-400'>Type:</strong> {transaction.transaction_type}
                             </p>
                             <p className="text-white text-lg uppercase">
                               <strong className='text-yellow-400'>Amount:</strong> ${transaction.amount}
                             </p>
                             <p className="text-white text-lg uppercase">
                               <strong className='text-yellow-400'>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                     
                    ) : (
                        <p className='text-white text-lg'>No transactions found.</p>
                    )}
                </div>
            </div>

            <div className='p-6'>
                <button 
                    onClick={handleBackToDashboard} 
                    className='bg-yellow-400 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300'>
                    Back To Dashboard
                </button>
            </div>
        </div>
    );
};

export default TransactionHistory;
