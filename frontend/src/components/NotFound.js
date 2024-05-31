import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = ({from}) => {
  return (
    <div className='flex justify-center items-center flex-col w-full h-[80vh] bg-gray-800 text-center'>
      <h1 className='text-4xl text-red-500'>{
        from === '/dashboard' ? 'UnAuthorized' : '404'
      }</h1>
      <p className='text-2xl text-yellow-400'>Page Not Found</p>
      <Link to='/' className='text-indigo-600 underline'>Go to Home</Link>
    </div>
  )
}

export default NotFound
