import React from 'react'
import { useAllContext } from '../context/AllContext'
import axios from 'axios';

const SortContainer = () => {
  const { setBusCallback, setLoaderCallback } = useAllContext();

  const handleSelectChange = async (e) => {
    let selectedValue = e.target.value;

    if(selectedValue === "--"){
      selectedValue = "date";
    }
    
    setLoaderCallback(true);

    const sortParams = {
      sortBy: selectedValue,
      orderBy: "ASC"
    }
    const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/sort`, sortParams);
    setBusCallback(response.data.array);
    setLoaderCallback(false);
  }
  return (
    <div className='flex gap-2 items-center'>
      <p>Sort By</p>
      <select
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none bg-white cursor-pointer"
        onChange={(e) => handleSelectChange(e)}
      >
        <option className="text-gray-700" value="--">--</option>
        <option className="text-gray-700" value="busName">Name</option>
        <option className="text-gray-700" value="startTime">Departure Time</option>
        <option className="text-gray-700" value="endTime">Reach Time</option>
        <option className="text-gray-700" value="ticketPrice">Price</option>
      </select>
    </div>

  )
}

export default SortContainer
