import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery
import Header from './Header';
import SideMenu from './SideMenu';

// Import your chart components
import AAPLChart from '../../services/AAPLChart';
import MSFTChart from './MsftChart';
import EURUSDChart from './EURUSDChart';
import AMZNChart from './AmazonChart';
import FBChart from './FBChart';
import GBPUSDChart from './GBPUSDChart';
import BAChart from './BAChart';
import BTCUSDChart from './BTCUSDChart';
import NDXChart from './NDXChart';

const TopPicks = () => {
  const [loadedCharts, setLoadedCharts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const chartComponents = [
    { symbol: 'AAPL', Component: AAPLChart },
    { symbol: 'MSFT', Component: MSFTChart },
    { symbol: 'EURUSD', Component: EURUSDChart },
    { symbol: 'GBPUSD', Component: GBPUSDChart },
    { symbol: 'NDX', Component: NDXChart },
    { symbol: 'BITCOIN', Component: BTCUSDChart },
  ];

  // Define media queries for responsiveness
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });

  useEffect(() => {
    let isMounted = true;

    const loadChartsSequentially = async () => {
      for (const chart of chartComponents) {
        if (!isMounted) break;
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        setLoadedCharts(prev => {
          if (prev.some(c => c.symbol === chart.symbol)) return prev;
          return [...prev, chart];
        });
      }
      if (isMounted) setIsLoading(false);
    };

    loadChartsSequentially();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 xs:h-24 xs:w-24 sm:h-32 sm:w-32 border-t-4 border-b-4 border-primaryGold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryBlue to-secondBlue">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideMenu />
        <main className={`flex-1 p-4 xs:p-6 sm:p-8 ${isMobile ? 'overflow-auto' : ''}`}>
          <section className="flex flex-col py-6 xs:py-8 px-4 xs:px-6 sm:px-8 bg-gradient-to-r from-primaryBlue to-secondBlue rounded-lg shadow-md">
            <p className="text-xl xs:text-2xl sm:text-3xl text-primaryGold font-semibold mb-4 xs:mb-6 sm:mb-8 leading-relaxed">
              Below is an overview of the current stock holdings within our investment bank's portfolio. We take pride in our strategic investments and diverse asset management.
            </p>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <p className='text-sm xs:text-base sm:text-lg text-white leading-relaxed'>
                Our investment bank holds a diverse range of stocks across key sectors, focusing on technology, finance, and cryptocurrency. In the technology sector, we have significant positions in leading companies such as Apple and Microsoft. These tech giants are at the forefront of innovation, and their growth potential aligns well with our long-term investment strategy.
              </p>
              <p className='text-sm xs:text-base sm:text-lg text-white leading-relaxed'>
                In the finance sector, our portfolio includes major financial instruments like the NDX index and GBP/USD forex pair. These assets provide stability and are crucial for balanced investment strategies, reflecting our market expertise and commitment to robust financial management.
              </p>
              <p className='text-sm xs:text-base sm:text-lg text-white leading-relaxed'>
                Additionally, our investment in cryptocurrency includes Bitcoin, which represents our forward-thinking approach to emerging asset classes. Bitcoin's performance and potential for high returns make it a valuable component of our investment strategy.
              </p>
              <p className='text-sm xs:text-base sm:text-lg text-white leading-relaxed'>
                Our current stock holdings are carefully selected to balance risk and reward, leveraging strong growth prospects across various sectors. We continuously analyze market trends to adjust our investments, ensuring alignment with our clients' goals and the evolving economic landscape.
              </p>
            </div>
          </section>

          <div className={`grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 mt-6 ${isMobile ? 'overflow-auto' : ''}`}>
            {loadedCharts.map(({ symbol, Component }) => (
              <div key={symbol} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-3 xs:p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-base xs:text-lg font-semibold text-gray-800">{symbol}</h3>
                </div>
                <div className="p-3 xs:p-4">
                  <Component />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopPicks;
