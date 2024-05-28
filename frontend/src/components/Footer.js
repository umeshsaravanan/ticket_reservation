import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='max-w-screen-xl w-full bg-gray-900 text-white '>
      <div className='w-[90%] flex gap-4 justify-evenly mx-auto flex-col md:flex-row p-4 *:space-y-2'>
        <div className='flex-1 flex flex-col'>
          <h1 className='font-bold'>RedBus</h1>
          <hr />
          <div className='flex justify-start gap-1'>
            <p className='font-medium'>Address :</p>
            <div>
              <p>example road</p>
              <p>example road</p>
              <p>example road</p>
            </div>
          </div>
          <p><span className='font-medium'>Email : </span>example@gmail.com</p>
          <p><span className='font-medium'>Ph : </span> 0000000000</p>
        </div>
        <div className='flex-1 flex flex-col'>
          <h1 className='font-bold'>Quick Links</h1>
          <hr />
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
        <div className='flex-1 flex flex-col'>
          <h1 className='font-bold'>Follow us</h1>
          <hr />
          <Link to=''>Linkedin</Link>
          <Link to=''>Facebook</Link>
          <Link to=''>Instagram</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
