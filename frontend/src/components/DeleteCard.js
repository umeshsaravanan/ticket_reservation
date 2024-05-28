import React from 'react'
import { IonIcon } from '@ionic/react'
import axios from 'axios';
import { arrowDown, trashBin } from 'ionicons/icons'

const DeleteCard = ({ busDetails, setBuses }) => {

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/admin/delete/${id}`);

      if (response.data.msg) {
        console.log("deleted Successfully")
        setBuses(prevBuses => prevBuses.filter(bus => bus._id !== id));
      }
      else {
        console.log(response.data.err)
      }

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='w-full bg-[#fefefe] shadow-md rounded-md'>
      <div className='flex items-center justify-between p-4 flex-1'>
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-10'>
            <h1 className='font-medium'>{busDetails.busName}</h1>
            <h1>id: {busDetails.id}</h1>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-5'>
            <p>{busDetails.start}</p>
            <IonIcon icon={arrowDown} className='md:rotate-[-90deg] duration-500' />
            <p>{busDetails.end}</p>
          </div>
        </div>
        <div className='group flex items-center justify-center bg-slate-200 shadow-xl p-4 rounded-lg text-red-500 text-xl cursor-pointer' onClick={() => handleDelete(busDetails._id)}>
          <IonIcon icon={trashBin} className='group-hover:scale-[1.1]' />
        </div>
      </div>
    </div>
  )
}

export default DeleteCard
