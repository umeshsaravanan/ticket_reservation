import { IonIcon } from '@ionic/react'
import { eye, peopleCircle, time } from 'ionicons/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminTasks = () => {
    return (
        <div className='max-w-screen-xl'>
            <div className='flex gap-4 w-[80%] flex-col md:flex-row flex-wrap mx-auto py-8 justify-center'>
                <Link className='sm:w-[25%]' to='history'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={time} className='text-5xl' />
                        <h1 className='font-bold whitespace-nowrap'>Booked Details</h1>
                    </div>
                </Link>
                <Link className='sm:w-[25%]' to='/'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={eye} className='text-5xl' />
                        <h1 className='font-bold whitespace-nowrap'>View All Buses</h1>
                    </div>
                </Link>
                <Link className='sm:w-[25%]' to='users'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={peopleCircle} className='text-5xl' />
                        <h1 className='font-bold whitespace-nowrap'>Users</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminTasks
