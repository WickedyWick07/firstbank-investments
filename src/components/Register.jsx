import { useContext } from 'react';
import React from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const Register = () => {
  const navigate = useNavigate();
  const {register, login} = useContext(AuthContext);

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
  });

  return (
    <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col items-center justify-center py-20'>
      <div className='bg-primaryBlue shadow-2xl py-10 px-10 border-none rounded-3xl max-w-lg w-full'>
        <h1 className="text-center text-5xl mb-8 text-primaryGold font-semibold uppercase">Register</h1>

        <Formik
          initialValues={{ first_name: '', last_name: '', email: '', username: '', password: '' }}
          validationSchema={checkValidationSchema}  
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values.username, values.first_name, values.last_name, values.email, values.password);
            setSubmitting(false);
            console.log('Form values:', values);
          }}
        >
        {({isSubmitting, errors, touched}) => (
          <Form className='flex flex-col space-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="firstName" className='uppercase text-2xl text-primaryGold font-semibold mb-2'>First Name:</label>
              <Field 
                id="firstName" 
                name="first_name" 
                type="text" 
                placeholder='Enter First Name' 
                className='w-full h-12 rounded-full text-center border border-primaryGold' 
              />
              {errors.first_name && touched.first_name ? <div className='text-red-500'>{errors.first_name}</div> : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="lastName" className='uppercase text-2xl text-primaryGold font-semibold mb-2'>Last Name:</label>
              <Field 
                id="lastName" 
                name="last_name" 
                type="text" 
                placeholder='Enter Last Name' 
                className='w-full h-12 rounded-full text-center border border-primaryGold' 
              />
              {errors.last_name && touched.last_name ? <div className='text-red-500'>{errors.last_name}</div> : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="email" className='uppercase text-2xl text-primaryGold font-semibold mb-2'>E-mail:</label>
              <Field 
                id="email" 
                name="email" 
                type="email" 
                placeholder='Enter Email' 
                className='w-full h-12 rounded-full text-center border border-primaryGold' 
              />
              {errors.email && touched.email ? <div className='text-red-500'>{errors.email}</div> : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="username" className='uppercase text-2xl text-primaryGold font-semibold mb-2'>Username:</label>
              <Field 
                id="username" 
                name="username" 
                type="text" 
                placeholder='Enter Username' 
                className='w-full h-12 rounded-full text-center border border-primaryGold' 
              />
              {errors.username && touched.username ? <div className='text-red-500'>{errors.username}</div> : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="password" className='uppercase text-2xl text-primaryGold font-semibold mb-2'>Password:</label>
              <Field 
                id="password" 
                name="password" 
                type="password" 
                placeholder='Enter Password' 
                className='w-full h-12 rounded-full text-center border border-primaryGold' 
              />
              {errors.password && touched.password ? <div className='text-red-500'>{errors.password}</div> : null}
            </div>

            <div className='flex justify-center mt-8'>
              <button 
                type="submit"
                className='border m-4 p-4 px-16 rounded-full text-xl uppercase text-white bg-slate-900 font-semibold hover:bg-slate-700 transition-all duration-300'
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
