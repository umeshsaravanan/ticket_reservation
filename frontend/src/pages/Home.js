import React from 'react'
import Navbar from '../components/Navbar'
import BusDetails from '../components/BusDetails';
import Footer from '../components/Footer';

const Home = () => {
  
  return (
    <div className='bg-slate-300 max-w-screen-xl'>
      <Navbar />
      <BusDetails/>
      <Footer />
    </div>
  )
}

export default Home
