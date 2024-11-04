import React from 'react';
import logoImg from '../assets/images/logoImg.png';

const Header = () => {
  return (
    <div className="w-full sticky top-0 bg-white z-50"> {/* Makes header sticky */}
      <header className='p-3 sm:p-5 max-w-screen-xl mx-auto'> {/* Max width container */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <img 
              src={logoImg} 
              alt="logo" 
              className="w-20 sm:w-24 md:w-32 h-auto transition-all duration-300" 
              // Added smooth transition
              loading="lazy" // Lazy loading for better performance
            />
          </div>
        </div>
        
        <hr className='bg-primaryGold mx-2 my-3 sm:my-5 h-0.5'/> {/* Added height to HR */}
      </header>
    </div>
  );
};

export default Header;