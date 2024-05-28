import React from 'react'
import Navbar from '../components/Navbar'
import NotFound from '../components/NotFound'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

const Page404 = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div className='h-screen'>
      <Navbar/>
      <NotFound from={from} />
      <Footer />
    </div>
  )
}

export default Page404
