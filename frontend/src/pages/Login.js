import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { notifyError, setUserEmail, setUserName, setUserRole } from '../redux/slice';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleNameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handlePwdChange = (e) =>{
        setPwd(e.target.value);
    }

    const handleLogin = async (e) =>{
        e.preventDefault();

        await axios.post('http://localhost:5001/login',{
            username,
            pwd
        }).then(res =>{
            if(res.data.msg){
                dispatch(setUserName(username))
                sessionStorage.setItem('role',res.data.role || null)
                dispatch(setUserRole(sessionStorage.getItem('role')))
                dispatch(setUserEmail(res.data.email))
                res.data.role ? navigate('/dashboard', { replace : true}) : navigate(from , {replace: true})
            }
            else
                dispatch(notifyError(res.data.err))
          }).catch(err => dispatch(notifyError(err)))
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="username"
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={pwd}
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handlePwdChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center">
              Don't have an account?{' '}
              <Link to='/register' className="font-medium text-indigo-600 hover:text-indigo-500"> Sign up</Link>
            </p>
        </form>
        
      </div>
      <ToastContainer newestOnTop />
    </div>
  );
};

export default Login;
