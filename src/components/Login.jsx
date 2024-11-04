import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      console.error('Login error');
    }
  };

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-primaryBlue shadow-xl py-8 px-4 sm:px-10 border-none rounded-3xl w-full max-w-md">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl mb-6 text-primaryGold font-semibold uppercase">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await handleLogin(values.email, values.password);
            setSubmitting(false);
            console.log('Form values:', values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="uppercase text-xl sm:text-2xl text-primaryGold font-semibold mb-2">Email:</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full h-10 sm:h-12 rounded-full text-center border border-primaryGold"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="uppercase text-xl sm:text-2xl text-primaryGold font-semibold mb-2">Password:</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full h-10 sm:h-12 rounded-full text-center border border-primaryGold"
                />
              </div>

              <div className="flex justify-center mt-6 sm:mt-8">
                <button
                  type="submit"
                  className="border m-2 sm:m-4 p-3 sm:p-4 px-8 sm:px-16 rounded-full text-lg sm:text-xl uppercase text-white bg-slate-900 font-semibold hover:bg-slate-700 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="text-base sm:text-xl text-primaryGold text-center mt-6 sm:mt-8">
                Don't have an account yet? <a href="/register" className="underline">Register</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;