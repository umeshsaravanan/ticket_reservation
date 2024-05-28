import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddBus = () => {

  const navigate = useNavigate();
  const [start, setStart] = useState('')
  const [id, setId] = useState()
  const [end, setEnd] = useState('')
  const [date, setDate] = useState('')
  const [agency, setAgency] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [travelHrs, setTravelHrs] = useState()
  const [ticketPrice, setTicketPrice] = useState()

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

  const handleAdd = async() =>{
    try{
      const response = await axios.post('http://localhost:5001/admin/add',{
        busName : agency,
        start,
        end,
        startTime,
        endTime,
        travelHrs,
        ticketPrice,
        id,
        type : 'seater',
        date,
        availableSeats: new Array(32).fill(0)
      })

      if(response.data.msg){
        navigate('/', {replace:true})
        console.log("added successfully")
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='max-w-screen-xl py-4 bg-slate-300 min-h-screen flex justify-center items-center flex-col gap-8'>
      <h1 className='font-bold text-lg text-center'>Enter Bus Details</h1>
      <form className='w-[80%] h-[80%] flex flex-col gap-8 text-md mx-auto' >
        <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
          <div className='flex justify-start flex-1'>
            <label htmlFor="busName" className='font-medium w-56'>Agency Name</label>
            <input type="text" value={agency} name='busName' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleAgency} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="id" className='font-medium w-56'>ID</label>
            <input type="number" value={id} name='id' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleId} />
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
            <input type="number" value={ticketPrice} name='travelHrs' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleTicketPrice} />
          </div>
          <div className='flex justify-start flex-1'>
            <label htmlFor="ticketPrice" className='font-medium w-56'>Date</label>
            <input type="date" value={date} name='travelHrs' className='focus:outline-none bg-transparent border border-b-1 border-b-black border-transparent w-full' onChange={handleDate} />
          </div>
        </div>
      </form>

      <div className='flex gap-4'>
        <button className='px-8 py-2 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700' onClick={handleAdd}>Add</button>
        <button className='px-8 py-2 text-white font-medium rounded-md bg-gray-600 hover:bg-gray-700' onClick={() =>navigate(-1)}>Back</button>
      </div>

    </div>
  )
}

export default AddBus
