import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/images/heroImg.jpg';
import investmentImg from '../assets/images/investmentImg.svg';
import portfolioImg from '../assets/images/portfolioImg.svg';
import shareholderImg from '../assets/images/shareholderImg.png';

const Home = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
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
        }, 5000);
    
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleNavigationToLogin = () => {
        navigate('/login');
    }

    const handleNavigationToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen min-w-screen flex flex-col'>
            <Header/> 

            <section className='text-center'>
                <h1 className='text-6xl md:text-6xl xs:text-4xl text-primaryGold uppercase my-6 font-bold'>
                    Welcome to InvestSmart First Bank
                </h1>
                <p className='text-2xl md:text-3xl text-primaryGold uppercase mb-4'>
                    Invest in Tech Giants, Become a Virtual Shareholder
                </p>

                <div className='flex flex-col md:flex-row justify-center gap-6 m-4 p-4'>
                    <button onClick={handleNavigationToLogin} className='border p-4 px-10 text-secondBlue bg-gray-900 font-semibold rounded border-none text-lg'>
                        <i className="bi bi-box-arrow-in-right mr-2"></i> Login
                    </button>
                    <button onClick={handleNavigationToRegister} className='border p-4 px-10 text-secondBlue bg-gray-900 font-semibold rounded border-none text-lg'>
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
                        {[
                            { name: "Apple", icon: "bi bi-apple", description: "Invest in one of the world's most valuable tech companies. Our virtual cards give you the benefits of being an Apple shareholder without the complexities of traditional stock ownership." },
                            { name: "Microsoft", icon: "bi bi-windows", description: "Become a virtual shareholder in Microsoft, a leader in software and cloud services. Experience the growth of this tech giant through our innovative investment platform." },
                            { name: "Virtual Cards", icon: "bi bi-credit-card", description: "Our unique virtual cards act as your shareholder pass. Enjoy benefits, track your investments, and participate in company growth, all through a simple and intuitive digital interface." }
                        ].map((item, index) => (
                            <li key={index} className='p-2 flex-1'>
                                <h1 className='text-primaryGold text-5xl my-4 flex items-center'>
                                    <i className={`${item.icon} mr-2`}></i> {item.name}
                                </h1>
                                <p className='text-base md:text-lg text-primaryGold'>
                                    {item.description}
                                </p>
                            </li>
                        ))}
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
                {[{
                    img: investmentImg,
                    title: "Simple Investment Process",
                    description: "Start your journey as a virtual shareholder with just a few clicks. Our streamlined process makes it easy for anyone to invest in tech giants like Apple and Microsoft."
                }, {
                    img: portfolioImg,
                    title: "Real-time Portfolio Tracking",
                    description: "Monitor your virtual shareholdings in real-time. Our advanced platform provides up-to-date information on your investments in Apple and Microsoft, helping you make informed decisions."
                }, {
                    img: shareholderImg,
                    title: "Exclusive Shareholder Benefits",
                    description: "Enjoy unique perks as a virtual shareholder. From early access to product launches to special discounts, our virtual cards open doors to exclusive benefits from Apple and Microsoft."
                }].map((item, index) => (
                    <div key={index} className='m-2 p-4 flex-1'>
                        <div className='flex flex-col items-center'>
                            <img src={item.img} alt={item.title} className='mb-4 h-48' />
                            <h1 className='text-2xl text-primaryGold'>
                                <i className="bi bi-arrow-repeat mr-2"></i> {item.title}
                            </h1>
                            <p className='text-primaryGold text-base md:text-lg text-center'>
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
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
