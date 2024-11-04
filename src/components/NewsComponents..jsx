import React, { useState, useEffect } from 'react';
import { getNewsArticles } from '../../services/newsApi';
import { useNavigate } from 'react-router-dom';

const NewsComponents = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsArticles(query);
        console.log('Articles:', data);
        setArticles(data);
      } catch (error) {
        setError('Failed to fetch news articles...');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md'>
      <h2 className='text-3xl text-primaryGold font-bold uppercase mb-4'>Latest News On {query}</h2>
      <ul className='space-y-4'>
        {articles.slice(0, showAll ? articles.length : visibleArticles).map((article, index) => (
          <li key={index} className='p-4 bg-gray-700 rounded hover:bg-gray-600 transition'>
            <a href={article.url} target='_blank' rel='noopener noreferrer' className='block'>
              <h3 className='text-xs text-gray-400'>{article.source_url}</h3>
              <p className='text-sm text-gray-400'>{new Date(article.pubDate).toLocaleDateString()}</p>
              <h3 className='text-lg text-primaryGold font-semibold'>{article.title}</h3>
            </a>
          </li>
        ))}
      </ul>
      {articles.length > visibleArticles && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'
        >
          View More
        </button>
      )}
      {showAll && (
        <button
          onClick={() => navigate('/news')}
          className='mt-4 text-blue-500 hover:text-blue-700 font-semibold underline'
        >
          Go to Full News Page
        </button>
      )}
    </div>
  );
};

export default NewsComponents;
