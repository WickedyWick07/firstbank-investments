// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import DashboardCards from './DashboardCards';
import ChartComponent from './ChartComponent';
import TransactionDiagram from './TransactionDiagram';
import StockData from './StockData';
import NewsComponents from './NewsComponents.';
import api from '../../services/api';

const Dashboard = () => {
  const [cardBalances, setCardBalances] = useState([]);
  const [chartData, setChartData] = useState(null);

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
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col text-white'>
      <section>
        <Header />
      </section>

      <section className='flex'>
        <SideMenu />
        <div className='flex-1 p-5 bg-secondaryBlue rounded-lg m-4 shadow-lg'>
          <h1 className='text-2xl text-primaryGold uppercase font-semibold mb-4'>Dashboard</h1>
          <div className='flex justify-between gap-4 mb-6'>
            <DashboardCards />
          </div>

          <section className='flex gap-4 mb-6'>
  <div className=' bg-primaryBlue p-4 rounded-lg  flex-1 transition-all duration-300 ease-in-out'>
    <ChartComponent />
  </div>
  <div className='bg-primaryBlue p-4 rounded-lg flex-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primaryBlue to-secondBlue hover:shadow-lg'>
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