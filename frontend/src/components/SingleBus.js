import { IonIcon } from '@ionic/react';
import axios from 'axios';
import { arrowDownOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifySuccess, notifyError, notifyWarning } from '../redux/slice';

const SingleBus = () => {

  const [bus, setBus] = useState({})
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [travelHrs, setTravelHrs] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const admin = sessionStorage.getItem('role') === '2003'
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(state => state.slice1.selectedSeats)
  const user = useSelector(state => state.slice1.username)
  const countSelectedSeats = list ? list.reduce((count, seat) => count + (seat ? 1 : 0), 0) : 0;
  const total = countSelectedSeats * ticketPrice;

  useEffect(() => {
    async function fetchSingleData() {
      try {
        const response = await axios.get(`http://localhost:5001/${id}`);
        if(response.data.err)
          dispatch(notifyError(response.data.err))
        else{
          setBus(response.data);
          setStart(response.data.start)
          setEnd(response.data.end)
          setDate(response.data.date)
          setStartTime(response.data.startTime)
          setEndTime(response.data.endTime)
          setTravelHrs(response.data.travelHrs)
          setTicketPrice(response.data.ticketPrice)
        }
      }catch(err){
        dispatch(notifyError(err))
      }
    }
    fetchSingleData()
  }, [id,dispatch])

  const handleBack = () => {
    if (admin)
      navigate('/admin')
    else
      navigate('/');
  }

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/${id}/${user}/confirmticket`, { 
        list,
        countSelectedSeats,
        total
     })

      if (response.data.msg) {
        setTimeout(()=>{
          navigate('/', { replace: true })
        },2000)
        dispatch(notifySuccess('Hooray! Booking Confirmed'))
      }
      else {
        dispatch(notifyWarning(response.data.err))
      }
    } catch (err) {
      dispatch(notifyError(err))
    }
  }

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const handleSubmit = async () => {

    try {
      const response = await axios.put(`http://localhost:5001/admin/update/${id}`, {
        start,
        end,
        startTime,
        endTime,
        date,
        travelHrs,
        ticketPrice
      })
      if (response.data.msg) {
        dispatch(notifySuccess('Updated to DB'))
        setEdit(false )
      }
      else{
        dispatch(notifyError('Error in updating DB'))
      }
    } catch (err) {
      dispatch(notifyError(err))
    }
  }

  const handleStart = (e) => {
    setStart(e.target.value)
  }
  const handleEnd = (e) => {
    setEnd(e.target.value)
  }
  const handleStartTime = (e) => {
    setStartTime(e.target.value)
  }
  const handleEndTime = (e) => {
    setEndTime(e.target.value)
  }
  const handleTravelHrs = (e) => {
    setTravelHrs(e.target.value)
  }
  const handleTicketPrice = (e) => {
    setTicketPrice(e.target.value)
  }

  const handleDate = (e) =>{
    setDate(e.target.value)
  }

  return (
    <div className='max-w-screen-xl bg-[#fefefe] mt-4 p-4 w-full border border-1 border-black rounded-sm min-h-[400px] md:max-h-[400px] shadow-md flex flex-col gap-2'>
      <div className='flex justify-between'>
        <h1><span className='font-medium'>Agency</span> : {bus.busName}</h1>
        {/* <button className='bg-indigo-600 px-2 py-1 rounded-xl text-white hover:scale-[1] scale-[0.9] duration-200'>Routes</button> */}
      </div>
      <hr />
      <div className='mt-4 flex w-[90%] justify-evenly md:flex-row flex-col space-y-4'>
        <div className='flex flex-col space-y-2 w-full'>
          <form className='w-full flex flex-col gap-2 text-md'>
          <div className='flex'>
              <label htmlFor="date" className='font-medium min-w-[120px]'>Date</label>
              <input type="date" value={date} name='date' className='focus:outline-none bg-transparent w-full' onChange={handleDate} disabled={!edit} />
            </div>
            <div className='flex'>
              <label htmlFor="start" className='font-medium min-w-[120px]'>From</label>
              <input type="text" value={start} name='start' className='focus:outline-none bg-transparent w-full' onChange={handleStart} disabled={!edit} />
            </div>
            <IonIcon icon={arrowDownOutline} />
            <div className='flex'>
              <label htmlFor="end" className='font-medium min-w-[120px]'>End</label>
              <input type="text" value={end} name='end' className='focus:outline-none bg-transparent w-full' onChange={handleEnd} disabled={!edit} />
            </div>
            <div className='flex'>
              <label htmlFor="startTime" className='font-medium min-w-[120px]'>Start Time</label>
              <input type="text" value={startTime} name='startTime' className='focus:outline-none bg-transparent w-full' onChange={handleStartTime} disabled={!edit} />
            </div>
            <div className='flex'>
              <label htmlFor="endTime" className='font-medium min-w-[120px]'>End Time</label>
              <input type="text" value={endTime} name='endTime' className='focus:outline-none bg-transparent w-full' onChange={handleEndTime} disabled={!edit} />
            </div>
            <div className='flex'>
              <label htmlFor="travelHrs" className='font-medium min-w-[120px]'>Travel Time</label>
              <input type="text" value={travelHrs+'hrs'} name='travelHrs' className='focus:outline-none bg-transparent w-full' onChange={handleTravelHrs} disabled={!edit} />
            </div>
            <div className='flex'>
              <label htmlFor="ticketPrice" className='font-medium min-w-[120px]'>Ticket Price</label>
              <input type="text" value={ticketPrice} name='ticketPrice' className='focus:outline-none bg-transparent w-full' onChange={handleTicketPrice} disabled={!edit} />
            </div>
          </form>
        </div>
        <div className='bg-gray-200 w-[0.2rem]'></div>
        <div className='flex flex-col space-y-4 w-full justify-between'>
          <div className='flex justify-between items-center'>
            <h1><span className='font-medium sm:ml-4'>selected seats</span></h1>
            <h1><span className='font-medium sm:ml-4'>Total : </span>&#8377;{total}</h1>
          </div>
          <h1 className='flex sm:ml-4'>{list ? list.map((seat, index) => (
            <p key={index}>{seat ? (index + 1) + ',' : null}</p>
          )) : null}</h1>
          <div className='flex w-[90%] mx-auto justify-evenly space-x-4 font-medium pt-8'>
            {
              !admin ? 
              <button className='px-4 py-2 rounded-md text-white hover:bg-blue-600 bg-blue-500' onClick={handleConfirm}>confirm</button> :
              null
            }
            <button className='px-4 py-2 max-h-[40px] rounded-md text-white hover:bg-yellow-500 bg-yellow-400' onClick={handleBack}>Home</button>
            {
              admin ?
              <div>{!edit ?
               <button className='px-4 py-2 rounded-md text-white hover:bg-green-400 bg-green-500' onClick={toggleEdit}>Edit</button> :
                (<div className='flex gap-4 flex-col md:flex-row'>
                    <button className='px-4 py-2 rounded-md text-white hover:bg-blue-600 bg-blue-500' onClick={handleSubmit}>Update</button>
                    <button className='px-4 py-2 rounded-md text-white hover:bg-red-600 bg-red-500' onClick={toggleEdit}>cancel</button>
                </div>)}
              </div> :
               null}
          </div>
        </div>
      </div>
      <div className='mt-8 bg-red-500 w-[90%] mx-auto h-12 rounded-xl flex items-center justify-center'>
        <h1 className='text-whit font-bold sm:text-lg text-xs text-center'>Have a happy and Safe Journey with RedBus </h1>
      </div>
      <ToastContainer newestOnTop autoClose={2000} />
    </div>
  )
}

export default SingleBus
