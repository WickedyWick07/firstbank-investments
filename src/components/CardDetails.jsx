import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import CardComponent from './CardComponent';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const CardDetails = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useContext(AuthContext);

  // Media queries for responsive design
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });

  const handleClick = () => {
    navigate('/account-creation');
  };

  return (
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        {!isSmallScreen && <SideMenu />}
        <div className={`flex-1 p-4 ${isSmallScreen ? 'p-2' : 'p-4'} sm:p-6`}>
          <div className='flex items-center justify-between mb-4'>
            <h1 className={`text-xl ${isSmallScreen ? 'text-lg' : 'text-2xl'} font-semibold text-primaryGold uppercase`}>
              My Cards
            </h1>
            <button 
              className='bg-primaryGold text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2'
              onClick={handleClick}
            >
              <span className='text-sm sm:text-base'>Add another card</span>
              <span className='text-lg sm:text-xl'>+</span>
            </button>
          </div>

          <section>
            <CardComponent />
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CardDetails;
