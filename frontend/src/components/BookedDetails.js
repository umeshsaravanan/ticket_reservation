import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HistoryCard from './HistoryCard'
import { useDispatch, useSelector } from 'react-redux'
import { notifyError } from '../redux/slice'

const BookedDetails = () => {
    const [history, setHistory] = useState(null)
    const [display, setDisplay] = useState(false)
    const dispatch = useDispatch();
    const redux = useSelector(state => state.slice1)
    const admin = sessionStorage.getItem('role') === '2003';

    useEffect(() =>{
        async function getHistory() {
            try{
              const response = await axios.get('http://localhost:5001/admin/gethistory')
              const list = admin ? response.data.response : response.data.response.filter(user => user.username === redux.username)
              setHistory(list)
              setDisplay(list.length > 0)
            }catch(err){
              dispatch(notifyError(err))
            }
        }
        getHistory();
    },[dispatch,redux,admin])

    // const handleDeleteAll = async() =>{
    //   try{
    //     const response = await axios.delete('http://localhost:5001/admin/deleteall')

    //     if(response.data.err)
    //       dispatch(notifyError(response.data.err))
    //   }catch(err){
    //     dispatch(notifyError(err))
    //   }
    // }
  return (
    <div className='max-w-screen-xl bg-slate-300 py-4'>
      <div className='flex flex-col min-h-screen'>
      {
        display ? (
          /* <button className='px-4 py-2 bg-red-500 w-[100px] text-white font-bold rounded-md m-2' onClick={handleDeleteAll}>delete</button> */ null
        ) : <h1 className='text-center'>No Booking Yet</h1>
      }
      <div className='w-[80%] mx-auto flex flex-col gap-4'>
      {
        history ? (
            history.map((data,index) =>(
                admin || !data.cancelled ? <HistoryCard history={data} key={index} setHistory={setHistory} setDisplay={setDisplay} list={history}/> : null
            ))
        ) : null
      }
      </div>
      </div>
    </div>
  )
}

export default BookedDetails
