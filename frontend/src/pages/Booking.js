import React from 'react'
import Navbar from '../components/Navbar';
import BusSeats from '../components/BusSeats';
import SingleBus from '../components/SingleBus';

const Booking = () => {
    const admin = sessionStorage.getItem('role') === '2003'

    return (
        <div className='max-w-screen-xxl bg-slate-300 min-h-screen '>
            <Navbar />
            <div className='bg-slate-300 max-w-screen-xl max-h-screen h-screen mx-auto'>
                {!admin ? (
                    <>
                        <h1 className='text-center font-bold mt-4'>Select your Seats</h1>
                        <div className='flex flex-col gap-2 bg-red-300 w-[90%] mx-auto p-2 text-sm my-4'>
                            <h1 className='font-bold'>NOTE</h1>
                            <ul>
                                <p>-&gt; Cancellation Available before 1hr of Starting Time</p>
                                <p>-&gt; <span className='text-md font-bold'>5%</span> per ticket will be taken as Penalty if you cancel within 1day of booking</p>
                                <p>-&gt; <span className='text-md font-bold'>40%</span> per ticket will be taken as Penalty if you cancel After 1day</p>
                            </ul>
                        </div>
                    </>
                ) : <h1 className='text-center font-bold mt-4'>Edit Bus Details</h1>}
                <div className='flex flex-col md:flex-row gap-4 w-[90%] mx-auto max-w-screen-xl pb-4'>
                    {!admin ? <BusSeats /> : null}
                    <SingleBus />
                </div>
            </div>
        </div>
    )
}

export default Booking
