import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useMediaQuery } from 'react-responsive';

const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false); // Close menu after navigating on mobile
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (isMobile) setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex">
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 bg-primaryGold text-white rounded fixed top-4 left-4 z-50">
          {isOpen ? (
            <i className="bi bi-x"></i> // Close icon
          ) : (
            <i className="bi bi-list"></i> // Hamburger icon
          )}
        </button>
      )}

      {/* Side Menu */}
      <nav 
        className={`fixed inset-y-0 left-0 bg-black bg-opacity-75 z-40 transition-all duration-300 
                    ${isMobile ? (isOpen ? 'block' : 'hidden') : 'block'}`}>
        <div className="border-r border-primaryGold px-4 w-64 flex flex-col h-full">
          {/* Close Button Inside the Menu (Visible on Mobile Only) */}
          {isMobile && isOpen && (
            <button 
              onClick={toggleMenu} 
              className="self-end p-2 bg-primaryGold text-white rounded mb-4">
              <i className="bi bi-x"></i> {/* Close icon */}
            </button>
          )}

          <h1 className="text-center text-2xl uppercase p-2 font-extrabold text-primaryGold">Menu</h1>

          <ul className="space-y-4">
            <li onClick={() => handleNavigation('/dashboard')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-house-door mr-2"></i> Dashboard
            </li>

            <li onClick={() => handleNavigation('/card-details')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-credit-card mr-2"></i> Card Details
            </li>

            <li onClick={() => handleNavigation('/booking')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-calendar-plus mr-2"></i> Book Your Banker
            </li>

            <li onClick={() => handleNavigation('/news')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-newspaper mr-2"></i> News Page
            </li>

            <li onClick={() => handleNavigation('/top-picks')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-star mr-2"></i> Our Holdings
            </li>

            <li onClick={() => handleNavigation('/transaction/history')} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-clock-history mr-2"></i> Transaction History
            </li>

            <li onClick={() => handleLogout()} className="border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center cursor-pointer">
              <i className="bi bi-box-arrow-right mr-2"></i> Logout
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideMenu;
