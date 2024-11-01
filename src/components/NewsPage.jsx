import React, { useEffect, useState } from 'react';
import { getNewsArticles } from '../../services/newsApi';
import Header from './Header';
import SideMenu from './SideMenu';

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

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

    // Calculate indices for slicing
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Pagination handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen'>
            <Header /> 

            <section className='flex flex-1'>
                <SideMenu />

                <div className='p-4 flex-1'>
                    <h1 className='text-center text-3xl text-primaryGold font-bold mb-2'>All News Articles</h1>
                    <ul className='m-4 p-4'>
                        {currentArticles.map((article, index) => (
                            <li className='border-b p-4 m-4 rounded hover:bg-slate-700' key={index}>
                                <div>
                                    <img src={article.urlToImage} className='w-24' alt="article-img" />
                                </div>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <h3 className='text-xl font-semibold underline text-primaryGold'>{article.title}</h3>
                                    <p className='text-md text-primaryGold m-1'>{article.description}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='flex justify-center mt-4'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-secondBlue text-black font-bold' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsPage;
