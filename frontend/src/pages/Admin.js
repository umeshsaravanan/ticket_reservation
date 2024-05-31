import React from 'react'
import Navbar from '../components/Navbar'
import AdminTasks from '../components/AdminTasks'

const Admin = () => {
  return (
    <div className='min-h-screen  bg-slate-300'>
      <Navbar />
      <AdminTasks />
    </div>
  )
}

export default Admin
