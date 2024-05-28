import { IonIcon } from '@ionic/react'
import { arrowForwardOutline, bus } from 'ionicons/icons'
import React from 'react'

const BusCard = ({busDetails}) => {
    return (
        <div className='max-w-screen-xl group cursor-pointer duration-200 md:mx-4 w-full'>
            <div className='w-[300px] bg-[#fefefe] flex flex-col p-2 gap-4 rounded-md shadow-md mt-6'>
                <div className='flex justify-between'>
                    <div className='flex items-center relative'>
                        <IonIcon icon={bus} className='absolute group-hover:bottom-4 duration-300 text-red-500'/>
                        <p className='absolute left-5 font-medium'>{busDetails.busName}</p>
                    </div>
                    <div className='flex items-center relative flex-col'>
                        <p>{busDetails.startTime} <IonIcon icon={arrowForwardOutline}/> {busDetails.endTime}</p>
                        <p className='text-sm'>{busDetails.date}</p>
                    </div>
                </div>
                <hr className='bg-slate-300 h-[.1rem]' />
                <div className='flex justify-between'>
                    <p>From : {busDetails.start}</p>
                    <p  className='flex justify-center basis-[100px]'>{busDetails.type}</p>
                </div>
                <div className='flex justify-between'>
                    <p>To : {busDetails.end}</p>
                    <p className='flex justify-center basis-[100px]'>&#8377;{busDetails.ticketPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default BusCard
