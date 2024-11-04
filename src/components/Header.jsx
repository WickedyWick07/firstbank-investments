import React from 'react';
import logoImg from '../assets/images/logoImg.png';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  // Media queries to determine screen size
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  // Determine image size based on screen size
  const logoWidth = isMobile ? 'w-24' : isTablet ? 'w-32' : 'w-40';

  return (
    <div>
      <header className='p-5'>
        <div className="text-center">
          <img 
            src={logoImg} 
            alt="logo" 
            className={`${logoWidth} h-auto mx-auto`} 
          />
        </div>
        <hr className='bg-primaryGold mx-2 my-5' />
      </header>
    </div>
  );
};

export default Header;
