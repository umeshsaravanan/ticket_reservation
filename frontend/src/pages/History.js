import React from 'react'
import Navbar from '../components/Navbar'
import AllHistory from '../components/AllHistory'

const History = () => {
  return (
    <div className='h-screen bg-slate-300 max-w-screen-xxl'>
      <Navbar />
      <AllHistory />
    </div>
  )
}

export default History
