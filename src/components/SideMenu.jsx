import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this line is included


const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='min-h-screen flex'>
      <nav className='border-r border-primaryGold px-4 w-64 flex flex-col min-h-screen'>
        <ul className='space-y-4 flex flex-col'>
          <h1 className='text-center text-2xl uppercase p-2 font-extrabold text-primaryGold'>Menu</h1>

          <button onClick={() => handleNavigation('/dashboard')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-house-door mr-2"></i> Dashboard
            </li>
          </button>

          <button onClick={() => handleNavigation('/card-details')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-credit-card mr-2"></i> Card Details
            </li>
          </button>

          <button onClick={() => handleNavigation('/booking')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-calendar-plus mr-2"></i> Book Your Banker
            </li>
          </button>

          <button onClick={() => handleNavigation('/news')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-newspaper mr-2"></i> News Page
            </li>
          </button>

          <button onClick={() => handleNavigation('/top-picks')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-star mr-2"></i> Our Holdings
            </li>
          </button>

          <button onClick={() => handleNavigation('/transaction/history')} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-clock-history mr-2"></i> Transaction History
            </li>
          </button>

          <button onClick={() => handleLogout()} className='w-full'>
            <li className='border rounded-full border-primaryGold p-2 m-1 text-center font-semibold text-primaryGold hover:bg-gradient-to-r from-primaryBlue to-secondBlue transition-all uppercase flex items-center justify-center'>
              <i className="bi bi-box-arrow-right mr-2"></i> Logout
            </li>
          </button>
          
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
