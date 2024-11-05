import { useContext } from 'react';
import React from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMediaQuery } from 'react-responsive';

const Register = () => {
  const navigate = useNavigate();
  const { register, login } = useContext(AuthContext);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleRegister = async (values, setSubmitting) => {
    const result = await register(values.username, values.first_name, values.last_name, values.email, values.password);
    console.log(result.data);
    if (result.success) {
      try {
        await login(values.email, values.password);
        navigate('/account-creation');
      } catch (error) {
        console.error(error);
      }
    }
    setSubmitting(false); // Set submitting to false after handling registration
  };

  const checkValidationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'), // Ensure password validation is included
  });

  return (
    <div className={`bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col items-center justify-center py-20`}>
      <div className={`bg-primaryBlue shadow-2xl py-10 px-10 border-none rounded-3xl max-w-lg w-full ${isMobile ? 'px-5' : 'px-10'}`}>
        <h1 className={`text-center text-5xl mb-8 text-primaryGold font-semibold uppercase ${isMobile ? 'text-2xl' : 'text-xl'}`}>Register</h1>

        <Formik
          initialValues={{ first_name: '', last_name: '', email: '', username: '', password: '' }}
          validationSchema={checkValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values, setSubmitting); // Pass values and setSubmitting to handleRegister
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={`flex flex-col space-y-6 ${isMobile ? "p-4" : "p-2"} ${isMobile ? "m-4" : "m-2"}`}>
              {/* Form Fields */}
              <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <label htmlFor="firstName" className={`uppercase text-2xl text-primaryGold font-semibold ${isMobile ? 'text-xl' : 'text-md'}`}>First Name:</label>
                <Field
                  id="firstName"
                  name="first_name"
                  type="text"
                  placeholder='Enter First Name'
                  className={`w-full h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
                />
                {errors.first_name && touched.first_name ? <div className='text-red-500'>{errors.first_name}</div> : null}
              </div>

              <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <label htmlFor="lastName" className={`uppercase text-2xl text-primaryGold font-semibold ${isMobile ? 'text-xl' : 'text-md'}`}>Last Name:</label>
                <Field
                  id="lastName"
                  name="last_name"
                  type="text"
                  placeholder='Enter Last Name'
                  className={`w-full h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
                />
                {errors.last_name && touched.last_name ? <div className='text-red-500'>{errors.last_name}</div> : null}
              </div>

              <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <label htmlFor="email" className={`uppercase text-2xl text-primaryGold font-semibold ${isMobile ? 'text-xl' : 'text-md'}`}>E-mail:</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Enter Email'
                  className={`w-full h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
                />
                {errors.email && touched.email ? <div className='text-red-500'>{errors.email}</div> : null}
              </div>

              <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <label htmlFor="username" className={`uppercase text-2xl text-primaryGold font-semibold ${isMobile ? 'text-xl' : 'text-md'}`}>Username:</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder='Enter Username'
                  className={`w-full h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
                />
                {errors.username && touched.username ? <div className='text-red-500'>{errors.username}</div> : null}
              </div>

              <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <label htmlFor="password" className={`uppercase text-2xl text-primaryGold font-semibold ${isMobile ? 'text-xl' : 'text-md'}`}>Password:</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Enter Password'
                  className={`w-full h-12 rounded-full text-center border border-primaryGold ${isMobile ? 'text-sm' : 'text-base'}`}
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
