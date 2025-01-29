import React from 'react'
import Navbar from '../components/Navbar'
import AdminTasks from '../components/AdminTasks'

const Admin = () => {
  return (
    <div className='min-h-screen  bg-slate-300'>
      <Navbar />
      <div className='bg-slate-300 max-w-screen-xl max-h-screen h-screen mx-auto'>
        <AdminTasks />  
      </div>
    </div>
  )
}

export default Admin
