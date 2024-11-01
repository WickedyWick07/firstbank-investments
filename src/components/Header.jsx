import React from 'react';
import logoImg from '../assets/images/logoImg.png';

const Header = () => {
  return (
    <div>
      <header className='p-5'>
       
         
          
          <div className="text-center">
            <img src={logoImg} alt="logo" className="w-32 h-auto mx-auto " />
          </div>

         
        

        <hr className='bg-primaryGold mx-2 my-5'/>         
      </header>
    </div>
  );
};

export default Header;
