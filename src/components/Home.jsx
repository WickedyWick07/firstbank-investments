import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/heroImg.jpg'; // replace '.jpg' with your actual file extension
import investmentImg from '../assets/images/investmentImg.svg'
import portfolioImg from '../assets/images/portfolioImg.svg'
import shareholderImg from '../assets/images/shareholderImg.png'

const Home = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0)
    const testimonials = [
        "This bank's investment options have helped me grow my portfolio beyond my expectations!",
        "The financial advice I received was top-notch, and my returns have been fantastic.",
        "I feel secure knowing my investments are in safe hands with this bank.",
        "Their investment platform is incredibly easy to use, and I've seen consistent growth.",
        "The personalized investment strategies have really boosted my confidence in managing my finances.",
        "I've never felt more informed about my investment decisions, thanks to the expert guidance provided.",
        "The range of investment options is impressive, and the team always helps me make informed choices.",
        "This bank has helped me diversify my investments, and my savings have never looked better."
      ];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change testimonial every 5 seconds
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, [testimonials.length]);
      
    
    const handleNavigationToLogin = () => {
        navigate('/login');
    }

    const handleNavigationToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen'>
            <Header/> 

            <section>
                <h1 className='text-6xl md:text-7xl text-primaryGold uppercase text-center my-6 font-bold'>
                    Welcome to InvestSmart First Bank
                </h1>
                <p className='text-2xl md:text-3xl text-center text-primaryGold uppercase mb-4'>
                    Invest in Tech Giants, Become a Virtual Shareholder
                </p>

                <div className='flex justify-center gap-10 m-4 p-4'>
                    <button onClick={handleNavigationToLogin} className='border m-4 p-4 px-10 text-secondBlue bg-gray-900 font-semibold rounded border-none text-lg'>
                        <i className="bi bi-box-arrow-in-right mr-2"></i> Login
                    </button>
                    <button onClick={handleNavigationToRegister} className='border m-4 p-4 px-10 text-secondBlue bg-gray-900 font-semibold rounded border-none text-lg'>
                        <i className="bi bi-person-plus-fill mr-2"></i> Register
                    </button>
                </div>

                <div className='flex justify-center border rounded-xl p-4 m-4 h-72 max-w-xl mx-auto'>
                    <img src={heroImg} alt="Virtual shareholding concept" className='object-cover h-full w-full'/>
                </div>

                <hr className='bg-primaryGold m-4 my-10'/>         
            </section>

            <section>
                <div className="">
                    <ul className='flex flex-col md:flex-row justify-between m-4 p-4'>
                        <li className='p-2 flex-1'>
                            <h1 className='text-primaryGold text-5xl my-4'>
                                <i className="bi bi-apple mr-2"></i> Apple
                            </h1>
                            <p className='text-base md:text-lg text-primaryGold'>
                                Invest in one of the world's most valuable tech companies. Our virtual cards give you the benefits of being an Apple shareholder without the complexities of traditional stock ownership.
                            </p>
                        </li>
                        <li className='p-2 flex-1'>
                            <h1 className='text-primaryGold text-5xl my-4'>
                                <i className="bi bi-windows mr-2"></i> Microsoft
                            </h1>
                            <p className='text-base md:text-lg text-primaryGold'>
                                Become a virtual shareholder in Microsoft, a leader in software and cloud services. Experience the growth of this tech giant through our innovative investment platform.
                            </p>
                        </li>
                        <li className='p-2 flex-1'>
                            <h1 className='text-primaryGold text-5xl my-4'>
                                <i className="bi bi-credit-card mr-2"></i> Virtual Cards
                            </h1>
                            <p className='text-base md:text-lg text-primaryGold'>
                                Our unique virtual cards act as your shareholder pass. Enjoy benefits, track your investments, and participate in company growth, all through a simple and intuitive digital interface.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="bg-secondBlue my-4 p-8">
                    <p className='text-black text-4xl font-extrabold text-center m-4 uppercase'>
                        Designed to Democratize Tech Investments
                    </p>
                    <p className='text-black text-lg text-center font-bold uppercase my-6'>
                        We've created an innovative platform to make you a virtual shareholder in top tech companies
                    </p>
                </div>
            </section>

            <section className='flex flex-col md:flex-row'>
                <div className='m-2 p-4 flex-1'>
                    <div className='flex flex-col items-center'>
                        <img src={investmentImg} alt="Easy Investment Process" className=' mb-4 h-48' />
                        <h1 className='text-2xl text-primaryGold'>
                            <i className="bi bi-arrow-repeat mr-2"></i> Simple Investment Process
                        </h1>
                        <p className='text-primaryGold text-base md:text-lg'>
                            Start your journey as a virtual shareholder with just a few clicks. Our streamlined process makes it easy for anyone to invest in tech giants like Apple and Microsoft.
                        </p>
                    </div>
                </div>
                <div className='m-2 p-4 flex-1'>
                    <div className='flex flex-col items-center'>
                        <img src={portfolioImg}alt="Real-time Portfolio Tracking" className=' mb-4 h-48' />
                        <h1 className='text-2xl text-primaryGold'>
                            <i className="bi bi-bar-chart-line mr-2"></i> Real-time Portfolio Tracking
                        </h1>
                        <p className='text-primaryGold text-base md:text-lg'>
                            Monitor your virtual shareholdings in real-time. Our advanced platform provides up-to-date information on your investments in Apple and Microsoft, helping you make informed decisions.
                        </p>
                    </div>
                </div>
                <div className='m-2 p-4 flex-1'>
                    <div className='flex flex-col items-center'>
                        <img src={shareholderImg} alt="Exclusive Shareholder Benefits" className=' mb-4 h-48' />
                        <h1 className='text-2xl text-primaryGold'>
                            <i className="bi bi-gift mr-2"></i> Exclusive Shareholder Benefits
                        </h1>
                        <p className='text-primaryGold text-base md:text-lg'>
                            Enjoy unique perks as a virtual shareholder. From early access to product launches to special discounts, our virtual cards open doors to exclusive benefits from Apple and Microsoft.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="bg-secondBlue my-8 p-8">
                    <p className='text-black text-4xl font-extrabold text-center m-4 uppercase'>
                        What Our Investors Say
                    </p>
                    <div className='flex flex-col md:flex-row gap-8 m-4 p-4 justify-center items-center'>
                     
                            <p className='text-black text-lg md:text-xl text-center font-bold uppercase my-6'>
                            <i className="bi bi-chat-left-quote mr-2"></i>
                                {testimonials[currentIndex]}
                            </p>
                     
                    </div>
                </div>
            </section>

            <Footer /> 
        </div>
    );
}

export default Home;
