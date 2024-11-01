import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Formik, Field, Form } from 'formik';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from './Footer';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Booking = () => {
  const { fetchCurrentUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleBooking = async (values) => {
    try {
      const response = await api.post('booking/', {
        banker_name: values.bankerName,
        reason_for_booking: values.reasonForBooking,
        booking_date: values.bookingDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
      });

      if (response.status === 201) {
        console.log('Booking successful:', response.data);
        alert('Booking successful!');
        navigate('/dashboard');
      } else {
        console.error('Error creating booking:', response.data);
        alert('An error occurred while booking. Please try again.');
      }
    } catch (error) {
      console.error('API error:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col'>
      <Header />
      <section className='flex flex-1'>
        <SideMenu />
        <div className='flex-1 p-6'>
          <h1 className='text-3xl font-bold text-primaryGold text-center uppercase mb-6'>Book Your Banker</h1>
          <Formik
            initialValues={{
              bankerName: '',
              reasonForBooking: '',
              bookingDate: new Date(),
            }}
            onSubmit={(values) => handleBooking(values)}
          >
            {({ setFieldValue, values }) => (
              <Form className='bg-primaryBlue p-8 rounded-lg shadow-lg'>
                <div className='mb-4'>
                  <label className='block text-lg font-semibold text-primaryGold mb-2' htmlFor='first_name'>Name</label>
                  {/* Add a check for currentUser */}
                  <p className='text-lg text-gray-700'>
                    {currentUser ? currentUser.first_name : 'Loading...'}
                  </p>
                </div>

                <div className='mb-4'>
                  <label className='block text-lg font-semibold text-primaryGold mb-2' htmlFor='bankerName'>Banker Name</label>
                  <Field as="select" id='bankerName' name='bankerName' className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGold'>
                    <option value="">Select a banker</option>
                    <option value="Jonathan Davies">Jonathan Davies</option>
                    <option value="Samantha Brooke">Samantha Brooke</option>
                    <option value="David Smith">David Smith</option>
                    <option value="Jim White">Jim White</option>
                    <option value="Simon Jordan">Simon Jordan</option>
                  </Field>
                </div>

                <div className='mb-4'>
                  <label className='block text-lg font-semibold text-primaryGold mb-2' htmlFor='reasonForBooking'>Reason for Booking</label>
                  <Field id='reasonForBooking' name='reasonForBooking' as='textarea' className='w-full h-32 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGold resize-none' />
                </div>

                <div className='mb-4'>
                  <label className='block text-lg font-semibold text-primaryGold mb-2'>Booking Date</label>
                  <Calendar
                    className='w-full rounded-lg border border-gray-300'
                    onChange={(date) => setFieldValue('bookingDate', date)}
                    value={values.bookingDate}
                  />
                </div>

                <button
                  type="submit"
                  className='bg-primaryGold text-white w-full py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 text-lg font-semibold'
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Booking;
