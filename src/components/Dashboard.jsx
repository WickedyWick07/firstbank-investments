import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import DashboardCards from './DashboardCards';
import ChartComponent from './ChartComponent';
import TransactionDiagram from './TransactionDiagram';
import StockData from './StockData';
import NewsComponents from './NewsComponents.';
import api from '../../services/api';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const Dashboard = () => {
  const [cardBalances, setCardBalances] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await api.get('cards/');
        const balances = response.data;
        setCardBalances(balances);
      } catch (error) {
        console.error("Error fetching card details", error);
      }
    };

    fetchCardDetails();
  }, []);

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen min-w-screen text-white">
      {/* Header at the top, full width */}
      <section>
        <Header />
      </section>

      {/* Mobile Menu Toggle Button */}
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

      {/* Flex container for SideMenu and main content */}
      <section className={`flex ${isMobile ? 'flex-col' : ''}`}>
        {/* Overlay for mobile/tablet */}
        {(isMobile || isTablet) && isSideMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={toggleSideMenu}
          />
        )}

        {/* SideMenu with conditional positioning */}
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

        {/* Main content area */}
        <div 
          className={`
            flex-grow p-5 bg-secondaryBlue rounded-lg m-4 shadow-lg 
            ${isMobile ? 'max-w-screen' : 'w-auto'} 
            ${isTablet ? 'flex-1' : ''}
          `}
        >
          <h1 className='text-2xl text-primaryGold uppercase font-semibold mb-4'>Dashboard</h1>
          <div className='flex justify-between gap-4 mb-6 flex-wrap'>
            <DashboardCards />
          </div>

          <section className={`flex gap-4 mb-6 flex-wrap ${isTablet ? 'flex-col' : ''}`}>
            <div className={`bg-primaryBlue p-4 rounded-lg flex-1 transition-all duration-300 ease-in-out ${
              isMobile ? 'w-full' : 'max-w-[calc(50%-1rem)]'
            }`}>
              <ChartComponent />
            </div>
            <div
  className={`bg-primaryBlue p-4 rounded-lg flex-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primaryBlue to-secondBlue hover:shadow-lg ${
    isMobile ? 'w-full max-w-[350px] mx-auto' : 'max-w-[calc(50%-1rem)]'
  }`}
  style={{
    height: isMobile ? 'auto' : '100%',
  }}
>
  <TransactionDiagram />
</div>
          </section>

          <section>
            <div className='bg-primaryBlue p-4 rounded-lg'>
              <StockData symbols={['AAPL', 'MSFT', 'GOOGL']} />
            </div>
          </section>

          <section>
            <div className='mt-6 bg-gradient-to-br from-primaryBlue to-secondBlue p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
              <h3 className='text-xl font-bold text-primaryGold mb-4'>Latest Stock News</h3>
              <NewsComponents query='stock' />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;