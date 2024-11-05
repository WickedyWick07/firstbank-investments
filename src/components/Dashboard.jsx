import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import DashboardCards from './DashboardCards';
import ChartComponent from './ChartComponent';
import TransactionDiagram from './TransactionDiagram';
import StockData from './StockData';
import NewsComponents from './NewsComponents';
import api from '../../services/api';
import { useMediaQuery } from 'react-responsive';

const Dashboard = () => {
  const [cardBalances, setCardBalances] = useState([]);
  const [chartData, setChartData] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

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

      {/* Flex container for SideMenu and main content */}
      <section className={`flex ${isMobile ? 'flex-col' : ''}`}>
        {/* SideMenu with a standard layout (no fixed positioning) */}
        <SideMenu />

        {/* Main content area */}
        <div className={`flex-grow p-5 bg-secondaryBlue rounded-lg m-4 shadow-lg ${isMobile ? 'w-full' : 'w-auto'} ${isTablet ? 'flex-1' : 'max-w-md'}`}>
          <h1 className='text-2xl text-primaryGold uppercase font-semibold mb-4'>Dashboard</h1>
          <div className='flex justify-between gap-4 mb-6 flex-wrap'>
            <DashboardCards />
          </div>

          <section className={`flex gap-4 mb-6 flex-wrap ${isTablet ? 'flex-col' : ''}`}>
            <div className={`bg-primaryBlue p-4 rounded-lg flex-1 transition-all duration-300 ease-in-out ${isMobile ? 'w-full' : 'max-w-[calc(50%-1rem)]'}`}>
              <ChartComponent />
            </div>
            <div className={`bg-primaryBlue p-4 rounded-lg flex-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primaryBlue to-secondBlue hover:shadow-lg ${isMobile ? 'w-full' : 'max-w-[calc(50%-1rem)]'}`}>
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
