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
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen flex flex-col items-center justify-center py-20">
      <div className="bg-primaryBlue shadow-xl py-10 px-10 border-none rounded-3xl max-w-lg w-full">
        <h1 className="text-center text-5xl mb-8 text-primaryGold font-semibold uppercase">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await handleLogin(values.email, values.password);
            setSubmitting(false);
            console.log('Form values:', values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="uppercase text-2xl text-primaryGold font-semibold mb-2">Email:</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full h-12 rounded-full text-center border border-primaryGold"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="uppercase text-2xl text-primaryGold font-semibold mb-2">Password:</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full h-12 rounded-full text-center border border-primaryGold"
                />
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="border m-4 p-4 px-16 rounded-full text-xl uppercase text-white bg-slate-900 font-semibold hover:bg-slate-700 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="text-xl text-primaryGold text-center mt-8">
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
