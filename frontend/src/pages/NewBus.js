import React from 'react'
import Navbar from '../components/Navbar'
import AddBus from '../components/AddBus'

const NewBus = () => {
  return (
    <div className='bg-slate-300 max-w-screen-xxl max-h-screen h-screen mx-auto'>
      <Navbar />
      <div className='bg-slate-300 max-w-screen-xl max-h-screen h-screen mx-auto'>
        <AddBus />
      </div>
    </div>
  )
}

export default NewBus
