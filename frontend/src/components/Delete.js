import React, { useEffect, useState } from 'react'
import DeleteCard from './DeleteCard'
import axios from 'axios';

const Delete = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5001/');
      setBuses(response.data.array);
    }
    fetchData();
  }, [])

  return (
    <div className='bg-slate-300 min-h-screen'>
      <div className='w-[80%] flex flex-col gap-2 mx-auto py-4'>
        {
          buses ? (
            buses.map((bus, index) => (
              <DeleteCard busDetails={bus} key={index} setBuses={setBuses} />
            ))
          ) : null
        }
      </div>
    </div>
  )
}

export default Delete
