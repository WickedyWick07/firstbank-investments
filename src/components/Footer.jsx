import React from 'react';

const Footer = () => {
  return (
    <div className='bg-secondBlue'>
        <section className='py-8 px-4 mx-auto'>
            <footer className='flex justify-between mx-40 text-center md:text-left'>
                <div>
                    <h2 className='text-2xl text-white font-bold mb-4'>Company</h2>
                    <ul className='text-lg text-white font-semibold'>
                        <li className='mb-2'><a href="#about" className='flex items-center hover:text-primaryGold'><i className="bi bi-info-circle mr-2"></i> About Us</a></li>
                        <li className='mb-2'><a href="#services" className='flex items-center hover:text-primaryGold'><i className="bi bi-briefcase mr-2"></i> Services</a></li>
                        <li className='mb-2'><a href="#careers" className='flex items-center hover:text-primaryGold'><i className="bi bi-person-workspace mr-2"></i> Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-2xl text-white font-bold mb-4'>Support</h2>
                    <ul className='text-lg text-white font-semibold'>
                        <li className='mb-2'><a href="#contact" className='flex items-center hover:text-primaryGold'><i className="bi bi-envelope mr-2"></i> Contact Us</a></li>
                        <li className='mb-2'><a href="#faq" className='flex items-center hover:text-primaryGold'><i className="bi bi-question-circle mr-2"></i> FAQ</a></li>
                        <li className='mb-2'><a href="#terms" className='flex items-center hover:text-primaryGold'><i className="bi bi-file-earmark-text mr-2"></i> Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-2xl text-white font-bold mb-4'>Follow Us</h2>
                    <ul className='text-lg text-white font-semibold'>
                        <li className='mb-2'>
                            <a href="https://facebook.com" className='flex items-center hover:text-primaryGold' target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook mr-2"></i> Facebook
                            </a>
                        </li>
                        <li className='mb-2'>
                            <a href="https://twitter.com" className='flex items-center hover:text-primaryGold' target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter mr-2"></i> Twitter
                            </a>
                        </li>
                        <li className='mb-2'>
                            <a href="https://instagram.com" className='flex items-center hover:text-primaryGold' target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram mr-2"></i> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </section>

        <section className='bg-darkBlue py-4'>
            <p className='text-center text-white text-sm'>
                &copy; {new Date().getFullYear()} InvestSmart First Bank. All rights reserved.
            </p>
        </section>
    </div>
  )
}

export default Footer;
