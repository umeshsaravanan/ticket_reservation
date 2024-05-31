import axios from 'axios';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notifyError, toggleLoading } from '../redux/slice';
import { ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";


const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ confirmpwd, setConfirmpwd ] = useState('');
    const [ error, setError ] = useState('');
    const [ valid, setValid] = useState(true);
    const isLoading = useSelector(state => state.slice1.isLoading)

    const handleNameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
        const mail = e.target.value;
        const pattern = /^[a-zA-Z0-9._%+-]+@gmail+\.[a-zA-Z]{2,}$/

        if(pattern.test(mail))
          setValid(true)
        else
          setValid(false)
    }
    
    const handlePwdChange = (e) =>{
      setError('')
      const value = e.target.value;
      setPwd(value);
      if(confirmpwd)
        handleMatch(pwd, value);
    }

    const handleConfirmpwdChange = (e) =>{
      setError('')
      const value = e.target.value;
      setConfirmpwd(value);
      handleMatch(pwd, value);
    }
    const handleMatch = (pwd,cpwd) =>{
      if(pwd !== cpwd)
        setError('Both password should match')
      else  
        setError('')
    }

    const handleRegister = async (e)=>{
      dispatch(toggleLoading())
        e.preventDefault();
        try{
          await axios.post(`${process.env.REACT_APP_BASE_URI}/register`,{
            username,
            email,
            pwd
        }).then(res =>{
          if(res.data.msg)
              navigate('/login', {replace: true})
          else
              dispatch(notifyError(res.data.err))
        })
        }catch(err){
          dispatch(notifyError('Error Occured'))
        }
        dispatch(toggleLoading())
    }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="w-[90%] max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                required
                id="username"
                name="username"
                type="text"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleEmailChange}
              />
              <p className={`${!valid ? 'block' : 'hidden'} text-red-500 text-sm text-start`}>invalid email</p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                required
                id="password"
                name="password"
                type="password"
                value={pwd}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handlePwdChange}
              />
            </div>
            <div>
              <label htmlFor="confirmpassword" className="sr-only">Password</label>
              <input
                required
                name="confirmpassword"
                type="password"
                value={confirmpwd}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleConfirmpwdChange}
              />
              <p className='text-red-500 text-sm text-start'>{error}</p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? <ClipLoader color={'white'} size={25} /> : 'Register'}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer newestOnTop />
    </div>
  );
};

export default Register;
