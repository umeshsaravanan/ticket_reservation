import React from 'react'
import Navbar from '../components/Navbar'
import BusDetails from '../components/BusDetails';
import FilterContainer from '../components/FilterContainer';

const Home = () => {

  return (
    <div className='bg-slate-300 max-w-screen-xxl max-h-screen h-screen'>
      <Navbar />
      <FilterContainer />
      <div className='bg-slate-300 max-w-screen-xl max-h-screen mx-auto'>
        <BusDetails />
      </div>
    </div>
  )
}

export default Home
