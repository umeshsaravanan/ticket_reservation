import React from 'react'

const SortContainer = () => {
  return (
    <div className='flex gap-2 items-center'>
    <p>Sort By</p>
    <select 
      class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none bg-white"
    >
      <option value="">Name</option>
      <option value="">Departure Time</option>
      <option value="">Reach Time</option>
      <option value="">Rating</option>
    </select>
  </div>
  
  )
}

export default SortContainer
