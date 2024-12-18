import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this line is included
import { useMediaQuery } from 'react-responsive';

const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open state
  };

  return (
    <div className='flex'>
      {/* Toggle Button for Mobile */}
      

      {/* Side Menu */}
      <nav className={`border-r border-primaryGold px-4 w-64 flex flex-col  md:block`}>
        <ul className={`space-y-4 `}>
          <h1 className='text-center text-2xl uppercase p-2 font-extrabold text-primaryGold'>Menu</h1>

          <li onClick={() => handleNavigation('/dashboard')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-house-door mr-2"></i> Dashboard
          </li>

          <li onClick={() => handleNavigation('/card-details')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-credit-card mr-2"></i> Card Details
          </li>

          <li onClick={() => handleNavigation('/booking')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-calendar-plus mr-2"></i> Book Your Banker
          </li>

          <li onClick={() => handleNavigation('/news')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-newspaper mr-2"></i> News Page
          </li>

          <li onClick={() => handleNavigation('/top-picks')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-star mr-2"></i> Our Holdings
          </li>

          <li onClick={() => handleNavigation('/transaction/history')} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-clock-history mr-2"></i> Transaction History
          </li>

          <li onClick={() => handleLogout()} className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer'>
            <i className="bi bi-box-arrow-right mr-2"></i> Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
