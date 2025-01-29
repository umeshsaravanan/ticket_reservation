import React from 'react'
import Navbar from '../components/Navbar'
import AllUsers from '../components/AllUsers'

const Users = () => {
  return (
    <div className='bg-slate-300 h-screen'>
      <Navbar />
      <div className='bg-slate-300 max-w-screen-xl max-h-screen h-screen mx-auto'>
        <AllUsers />
      </div>
    </div>
  )
}

export default Users
