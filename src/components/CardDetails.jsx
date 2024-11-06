import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import SideMenu from './SideMenu'
import Footer from './Footer'
import api from '../../services/api'
import CardComponent from './CardComponent'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';


const CardDetails = () => {
  const navigate = useNavigate()
  const {fetchCurrentUser} = useContext(AuthContext)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });


  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };




  const handleClick = () => {
    navigate('/account-creation')

  }


  
  return (
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col'>
      <Header /> 
      <section className='flex flex-1'>
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

      <div className='flex-1 '>
      <div className='flex-1 p-4'>
  <div className='flex items-center justify-between mb-4'>
    <h1 className='text-2xl font-semibold text-primaryGold uppercase'>My Cards</h1>
    <button 
      className='bg-primaryGold text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2'
      onClick={() => handleClick()}
    >
      <span className='text-sm'>Add another card</span>
      <span className='text-xl'>+</span>
    </button>
  </div>
</div>


        <section>
        <CardComponent />
        </section>
      </div>


      </section>

      <Footer/>
    </div>
  )
}

export default CardDetails
