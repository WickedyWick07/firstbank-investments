import React from 'react';
import logoImg from '../assets/images/logoImg.png';

const Header = () => {
  return (
    <header className="p-4 sm:p-5 max-w-screen-lg mx-auto">
      <div className="text-center">
        <img 
          src={logoImg} 
          alt="logo" 
          className="w-24 h-auto mx-auto sm:w-32 md:w-48 lg:w-64"
        />
      </div>
      <hr className="bg-primaryGold mx-2 my-4 sm:my-5" />
    </header>
  );
};

export default Header;
