import React from 'react'
import CancelTicket from '../components/CancelTicket'
import Navbar from '../components/Navbar'

const CancelPage = () => {
  return (
    <div className='bg-slate-300 max-w-screen-xxl max-h-screen h-screen'>
      <Navbar />
      <div className='bg-slate-300 max-w-screen-xl max-h-screen mx-auto'>
        <CancelTicket />
      </div>
    </div>
  )
}

export default CancelPage
