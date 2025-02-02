import { IonIcon } from '@ionic/react'
import axios from 'axios'
import { arrowForwardOutline, bus } from 'ionicons/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyError, notifySuccess } from '../redux/slice'

const BusCard = ({busDetails, setBuses}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admin = sessionStorage.getItem('role') === '2003';

    const handleDelete = async () => {
        try {
          const response = await axios.delete(`${process.env.REACT_APP_BASE_URI}/admin/delete/${busDetails._id}`);
    
          if (response.data.msg) {
            dispatch(notifySuccess("deleted Successfully"));
            setTimeout(()=>{
                setBuses(prevBuses => prevBuses.filter(bus => bus._id !== busDetails._id));
            },2000)
          }
          else {
            dispatch(notifyError(response.data.err));
          }
    
        } catch (err) {
            dispatch(notifyError(err));
        }
      }
    return (
        <div className='max-w-screen-xxl group cursor-pointer duration-200 md:mx-4'>
            <div className={`w-[300px] bg-[#fefefe] flex flex-col p-2 gap-4 rounded-t-md shadow-md mt-6 z-20`} onClick={() =>navigate(`/${busDetails._id}`)}>
                <div className='flex justify-between'>
                    <div className='flex items-center relative'>
                        <IonIcon icon={bus} className='absolute group-hover:bottom-4 duration-300 text-red-500'/>
                        <p className='absolute left-5 font-medium'>{busDetails.busName}</p>
                    </div>
                    <div className='flex items-center relative flex-col'>
                        <p>{busDetails.startTime}:00 <IonIcon icon={arrowForwardOutline}/> {busDetails.endTime}:00</p>
                        <p className='text-sm'>{busDetails.date.split('T')[0]}</p>
                    </div>
                </div>
                <hr className={'bg-slate-300 h-[.1rem]'} />
                <div className='flex justify-between'>
                    <p>From : {busDetails.start}</p>
                    <p  className='flex justify-center basis-[100px]'>{busDetails.type}</p>
                </div>
                <div className='flex justify-between'>
                    <p>To : {busDetails.end}</p>
                    <p className='flex justify-center basis-[100px]'>&#8377;{busDetails.ticketPrice}</p>
                </div>
            </div>
            {
                admin ? (
                    <div className='flex w-[300px] invisible group-hover:visible ease-in-out'>
                        <button className='flex-1 ease-in-out p-2 hover:bg-green-500 bg-green-400 rounded-bl-md font-medium' onClick={() =>navigate(`/${busDetails._id}`)}>Edit</button>
                        <button className='flex-1 ease-in-out p-2 hover:bg-gray-950 bg-gray-800 text-white rounded-br-md font-medium' onClick={handleDelete}>Delete</button>
                    </div>
                ):
                null
            }
        </div>
    )
}

export default BusCard
