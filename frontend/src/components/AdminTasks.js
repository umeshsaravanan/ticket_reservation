import { IonIcon } from '@ionic/react'
import { addCircleOutline, eyeOutline, timeOutline, trashBinOutline } from 'ionicons/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminTasks = () => {
    return (
        <div className='max-w-screen-xl min-h-[100vh] bg-slate-300'>
            <div className='flex gap-4 w-[80%] flex-col md:flex-row flex-wrap mx-auto py-8 justify-center'>
                <Link to='history'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={timeOutline} className='text-3xl' />
                        <h1 className='font-bold whitespace-nowrap'>Booked Details</h1>
                    </div>
                </Link>
                <Link to='/'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={eyeOutline} className='text-3xl' />
                        <h1 className='font-bold whitespace-nowrap'>View All Buses</h1>
                    </div>
                </Link>
                <Link to='addbus'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={addCircleOutline} className='text-3xl' />
                        <h1 className='font-bold whitespace-nowrap'>Add New Bus</h1>
                    </div>
                </Link>
                <Link to='deletebus'>
                    <div className='px-16 flex-1 bg-[#fefefe] h-32 cursor-pointer flex flex-col justify-center gap-[1rem] items-center rounded-md shadow-lg'>
                        <IonIcon icon={trashBinOutline} className='text-3xl' />
                        <h1 className='font-bold whitespace-nowrap'>Delete Buses</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminTasks
