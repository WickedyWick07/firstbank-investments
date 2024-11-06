import React, { useEffect, useState } from 'react';
import { getNewsArticles } from '../../services/newsApi';
import Header from './Header';
import SideMenu from './SideMenu';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsArticles('stock'); // Adjust query as needed
        setArticles(data);
      } catch (error) {
        setError('Failed to fetch news articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryGold"></div>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen">
      <Header />

      <section className="flex flex-1">
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
          className={`${
            isMobile || isTablet
              ? 'fixed left-0 top-0 h-full w-64 hover:bg-gradient-to-br from-primaryBlue to-secondBlue bg-primaryBlue bg-opacity-80 shadow-lg z-40'
              : 'relative w-64'
          } transition-transform duration-300 ease-in-out ${
            (isMobile || isTablet) && !isSideMenuOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <SideMenu />
        </aside>

        <div className="p-4 flex-1">
          <h1 className="text-center text-3xl text-primaryGold font-bold mb-2">All News Articles</h1>
          <ul className="m-4 p-4">
            {articles.map((article, index) => (
              <li
                className="my-4 p-4 bg-gradient-to-r from-primaryBlue to-secondBlue rounded-lg shadow hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                key={index}
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xs text-gray-300">{article.source_url}</h3>
                  <p className="text-sm text-gray-300">{new Date(article.pubDate).toLocaleDateString()}</p>
                  <h3 className="text-2xl text-primaryGold font-semibold">{article.title}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
