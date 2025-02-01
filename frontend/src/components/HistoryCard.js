import { IonIcon } from '@ionic/react'
import { arrowDown, checkmarkDone, close, trash } from 'ionicons/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccess, notifyWarning } from '../redux/slice'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import Loader from './Loader'
const HistoryCard = ({ history, setHistory, setDisplay, list }) => {

  const dispatch = useDispatch();
  const admin = sessionStorage.getItem('role') === '2003';
  const [isLoading, setIsLoading] = useState(false);

  const handleHistoryDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URI}/admin/deleteHistory/${history._id}`);

      if (response.data.msg) {
        setHistory(prev => prev.filter(user => user._id !== history._id));
        setDisplay(list.length > 0);
      }
      else
        dispatch(notifyError('Error deleting History'))
    } catch (err) {
      dispatch(notifyError(err))
    }
  }

  const handleCancel = async () => {
    const confirm = window.confirm("Cancelling Tickets will results in Penalty deduction!!")
    if (confirm) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/cancel`, history)
        setIsLoading(false);
        if (response.data.err)
          dispatch(notifyError(response.data.err))
        else {
          dispatch(notifyWarning('\u20B9' + response.data.penalty + ' Penalty Applied'))
          dispatch(notifySuccess('Tickets Cancelled'))
          setTimeout(() => {
            setHistory(prev => prev.filter(user => user._id !== history._id));
          }, 2000)
        }
      } catch (err) {
        dispatch(notifyError(err))
      }
    }
  }
  return (
    <div className='w-full bg-[#fefefe] shadow-md rounded-md'>
      <div className='flex items-center justify-between p-4 flex-1'>
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-10'>
            <h1 className='font-medium'>{history.bus.busName}</h1>
            <h1>id: {history.bus.id}</h1>
          </div>
          <h1 className='font-medium'>username : {history.username}</h1>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-5'>
            <p>{history.bus.start}</p>
            <IonIcon icon={arrowDown} className='md:rotate-[-90deg] duration-500' />
            <p>{history.bus.end}</p>
          </div>
          <h1 className='flex'>Booked Seats : {history.choosenSeats ? history.choosenSeats.map((seat, index) => (
            <p key={index}>{seat ? (index + 1) + ' ' : null}</p>
          )) : null}</h1>
          <p>Date : {history.bus.date.split('T')[0]}</p>
        </div>
        <div className='flex gap-2 flex-col sm:flex-row'>
          <div className={`group flex items-center justify-center bg-slate-200 shadow-xl p-4 rounded-lg text-xl cursor-pointer ${history.cancelled ? 'text-red-500' : 'text-green-500'}`} title='status'>
            <IonIcon icon={checkmarkDone} className={`group-hover:scale-[1.3] `} /><p className='text-sm hidden sm:block'>{history.cancelled ? 'Cancelled' : 'Confirmed'}</p>
          </div>
          {admin ? (<div className='group flex items-center justify-center bg-slate-200 shadow-xl p-4 rounded-lg text-red-500 text-xl cursor-pointer' onClick={handleHistoryDelete}>
            <IonIcon icon={trash} className='group-hover:scale-[1.1]' />
          </div>) : !history.cancelled && (<div className='group flex items-center justify-center bg-slate-200 shadow-xl p-4 rounded-lg text-red-500 text-xl cursor-pointer' onClick={handleCancel}>
            <IonIcon icon={close} className='group-hover:scale-[1.1] duration-200' /><p className='text-sm group-hover:scale-[1.1] duration-200 hidden sm:block'>cancel</p>
          </div>)}
        </div>
      </div>
      {isLoading && <Loader />}
      <ToastContainer newestOnTop autoClose={2000} />
    </div>
  )
}

export default HistoryCard
