import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className='bg-primaryBlue min-h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <SideMenu />

        <div className='flex-1 p-4'>
          {/* First About Us Section */}
          <div className='mb-8'>
            <h1 className='text-2xl uppercase text-center text-primaryGold mx-auto font-semibold mb-4'>About us</h1>
            <div className='flex flex-col md:flex-row items-center'>
              <img src="" alt="about-us-img" className='border m-4 p-4 w-3/5 h-48 rounded' />
              <div className='ml-0 md:ml-8 mt-4 md:mt-0'>
                <p className='text-primaryGold text-2xl font-extrabold mb-2'>Heading</p>
                <p className='text-primaryGold text-xl font-semibold mb-2'>SubHeading</p>
                <p className='text-primaryGold text-md font-bold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam quam similique, veritatis cumque totam nulla amet suscipit unde quod perferendis voluptatem nostrum id. Odio nobis alias fugiat quidem voluptatum?</p>
              </div>
            </div>
          </div>

          <hr className='border-primaryGold mb-8' />

          {/* Second About Us Section */}
          <div className='mb-8'>
            <h1 className='text-2xl uppercase text-center text-primaryGold mx-auto font-semibold mb-4'>About us</h1>
            <div className='flex flex-col md:flex-row items-center'>
              <img src="" alt="about-us-img" className='border m-4 p-4 w-3/5 h-48 rounded' />
              <div className='ml-0 md:ml-8 mt-4 md:mt-0'>
                <p className='text-primaryGold text-2xl font-extrabold mb-2'>Heading</p>
                <p className='text-primaryGold text-xl font-semibold mb-2'>SubHeading</p>
                <p className='text-primaryGold text-md font-bold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam quam similique, veritatis cumque totam nulla amet suscipit unde quod perferendis voluptatem nostrum id. Odio nobis alias fugiat quidem voluptatum?</p>
              </div>
            </div>
          </div>

          <hr className='border-primaryGold mb-8' />

          {/* Third About Us Section */}
          <div className='mb-8'>
            <h1 className='text-2xl uppercase text-center text-primaryGold mx-auto font-semibold mb-4'>About us</h1>
            <div className='flex flex-col md:flex-row items-center'>
              <img src="" alt="about-us-img" className='border m-4 p-4 w-3/5 h-48 rounded' />
              <div className='ml-0 md:ml-8 mt-4 md:mt-0'>
                <p className='text-primaryGold text-2xl font-extrabold mb-2'>Heading</p>
                <p className='text-primaryGold text-xl font-semibold mb-2'>SubHeading</p>
                <p className='text-primaryGold text-md font-bold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam quam similique, veritatis cumque totam nulla amet suscipit unde quod perferendis voluptatem nostrum id. Odio nobis alias fugiat quidem voluptatum?</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;
