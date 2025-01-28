import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccess } from '../redux/slice'
import { ToastContainer } from 'react-toastify'

const AddBus = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [start, setStart] = useState(null)
  const [id, setId] = useState(null)
  const [end, setEnd] = useState(null)
  const [date, setDate] = useState(null)
  const [agency, setAgency] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [travelHrs, setTravelHrs] = useState(null)
  const [ticketPrice, setTicketPrice] = useState(null)
  const [startLat, setStartLat] = useState(0)
  const [startLng, setStartLng] = useState(0)
  const [endLat, setEndLat] = useState(0)
  const [endLng, setEndLng] = useState(0)

  const handleStart = (e) => {
    setStart(e.target.value)
  }
  const handleEnd = (e) => {
    setEnd(e.target.value)
  }
  const handleId = (e) => {
    setId(e.target.value)
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
  const handleAgency = (e) => {
    setAgency(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
  }
  const handleStartLat = (e) => {
    setStartLat(e.target.value)
  }
  const handleStartLng = (e) => {
    setStartLng(e.target.value)
  }
  const handleEndLat = (e) => {
    setEndLat(e.target.value)
  }
  const handleEndLng = (e) => {
    setEndLng(e.target.value)
  }

  const handleAdd = async () => {

    if(agency && endLng && endLat && startLng && startLat && ticketPrice && travelHrs && endTime && startTime && date && end && start && id){
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/admin/add`, {
          busName: agency,
          start,
          end,
          startTime: Number(startTime),
          endTime: Number(endTime),
          travelHrs,
          ticketPrice,
          id,
          type: 'seater',
          date: new Date(date),
          startCo: {
            lat: Number(startLat),
            lng: Number(startLng)
          },
          endCo: {
            lat: Number(endLat),
            lng: Number(endLng)
          },
          availableSeats: new Array(32).fill(0)
        })
  
        if (response.data.msg) {
          dispatch(notifySuccess("added successfully"))
          navigate('/', { replace: true })
        }
        else
          dispatch(notifyError("Error Occured"))
      } catch (err) {
        dispatch(notifyError('Error'))
      }
    }else{
      dispatch(notifyError('All Fields are Required !'))
    }
  }
  return (
    <div className='max-w-screen-xxl py-4 bg-slate-300 min-h-screen flex justify-center items-center flex-col gap-8'>
      <h1 className='font-bold text-lg text-center'>Enter Bus Details</h1>
      <form className='w-[80%] h-[80%] flex flex-col gap-8 text-md mx-auto' >
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="busName" className='font-medium w-56'>Agency Name</label>
            <input type="text" value={agency} name='busName' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleAgency} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="id" className='font-medium w-56'>ID</label>
            <input type="number" required={true} value={id} name='id' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleId} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="start" className='font-medium w-56'>From</label>
            <input type="text" value={start} name='start' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleStart} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="end" className='font-medium w-56'>To</label>
            <input type="text" value={end} name='end' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleEnd} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="startTime" className='font-medium w-56'>Start Time</label>
            <input type="text" value={startTime} name='startTime' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleStartTime} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="endTime" className='font-medium w-56'>End Time</label>
            <input type="text" value={endTime} name='endTime' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleEndTime} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="travelHrs" className='font-medium w-56'>Travel Time</label>
            <input type="number" value={travelHrs} name='travelHrs' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleTravelHrs} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="travelHrs" className='font-medium w-56'>Type</label>
            <input type="text" value='seater' name='travelHrs' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' disabled />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="ticketPrice" className='font-medium w-56'>Ticket Price</label>
            <input type="number" value={ticketPrice} name='ticketPrice' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleTicketPrice} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="date" className='font-medium w-56'>Date</label>
            <input type="date" value={date} name='date' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleDate} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="startLat" className='font-medium w-56'>Start Lat</label>
            <input type="number" value={startLat} name='startLat' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleStartLat} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="startLng" className='font-medium w-56'>Start Lng</label>
            <input type="number" value={startLng} name='startLng' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleStartLng} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="endLat" className='font-medium w-56'>End Lat</label>
            <input type="number" value={endLat} name='endLat' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleEndLat} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="endLng" className='font-medium w-56'>End Lng</label>
            <input type="number" value={endLng} name='endLng' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleEndLng} />
          </div>
        </div>
      </form>

      <div className='flex gap-4'>
        <button className='px-8 py-2 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700' onClick={handleAdd}>Add</button>
        <button className='px-8 py-2 text-white font-medium rounded-md bg-gray-600 hover:bg-gray-700' onClick={() => navigate(-1)}>Back</button>
      </div>
    <ToastContainer newestOnTop autoClose={2000} />
    </div>
  )
}

export default AddBus
