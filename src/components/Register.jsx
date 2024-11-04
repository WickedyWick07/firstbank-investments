import { useContext } from 'react';
import React from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMediaQuery } from 'react-responsive';

const Register = () => {
  const navigate = useNavigate();
  const { register, login } = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  
  const handleRegister = async (username, first_name, last_name, email, password) => {
    const result = await register(username, first_name, last_name, email, password);
    console.log(result.data);
    if (result.success) {
      try {
        await login(email, password);
        navigate('/account-creation');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkValidationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  // Responsive breakpoints

  return (
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8'>
      <div className='bg-primaryBlue shadow-2xl py-8 px-4 sm:px-10 border-none rounded-3xl w-full max-w-md'>
        <h1 className={`text-center ${isMobile ? 'text-3xl' : 'text-4xl'} lg:text-5xl mb-6 text-primaryGold font-semibold uppercase`}>
          Register
        </h1>

        <Formik
          initialValues={{ first_name: '', last_name: '', email: '', username: '', password: '' }}
          validationSchema={checkValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values.username, values.first_name, values.last_name, values.email, values.password);
            setSubmitting(false);
            console.log('Form values:', values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col space-y-4 sm:space-y-6'>
              {['first_name', 'last_name', 'email', 'username', 'password'].map((field) => (
                <div key={field} className='flex flex-col'>
                  <label htmlFor={field} className={`uppercase ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} text-primaryGold font-semibold mb-2`}>
                    {field.replace('_', ' ')}:
                  </label>
                  <Field
                    id={field}
                    name={field}
                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                    placeholder={`Enter ${field.replace('_', ' ')}`}
                    className={`w-full h-10 sm:h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
                  />
                  <ErrorMessage name={field} component="div" className='text-red-500 text-sm mt-1' />
                </div>
              ))}

              <div className='flex justify-center mt-6 sm:mt-8'>
                <button
                  type="submit"
                  className='border m-2 sm:m-4 p-3 sm:p-4 px-8 sm:px-16 rounded-full text-lg sm:text-xl uppercase text-white bg-slate-900 font-semibold hover:bg-slate-700 transition-all duration-300'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
