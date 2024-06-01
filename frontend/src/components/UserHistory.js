import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HistoryCard from './HistoryCard'
import { useDispatch, useSelector } from 'react-redux'
import { notifyError } from '../redux/slice'
import { IonIcon } from '@ionic/react'
import { arrowBackCircle } from 'ionicons/icons'
import { useNavigate } from 'react-router-dom'

const BookedDetails = () => {
  const [history, setHistory] = useState(null)
  const [display, setDisplay] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redux = useSelector(state => state.slice1)
  const admin = sessionStorage.getItem('role') === '2003';
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    async function getHistory() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URI}/gethistory/${username}`)
        const list = response.data.response
        setHistory(list)
        setDisplay(list.length > 0)
      } catch (err) {
        dispatch(notifyError(err))
      }
    }
    getHistory();
  }, [dispatch, redux, admin, username])

  // const handleDeleteAll = async() =>{
  //   try{
  //     const response = await axios.delete(`${process.env.REACT_APP_BASE_URI}/admin/deleteall`)

  //     if(response.data.err)
  //       dispatch(notifyError(response.data.err))
  //   }catch(err){
  //     dispatch(notifyError(err))
  //   }
  // }
  return (
    <div className='max-w-screen-xl'>
      <div className='flex flex-col pt-4'  style={{ height: 'calc(100vh - 56px)' }}>
        <div className='w-[80%] mx-auto'>
          <IonIcon icon={arrowBackCircle} className='text-3xl cursor-pointer' onClick={() => navigate(-1)} />
        </div>
        {
          display ? (
          /* <button className='px-4 py-2 bg-red-500 w-[100px] text-white font-bold rounded-md m-2' onClick={handleDeleteAll}>delete</button> */ null
          ) : <h1 className='text-center'>No Booking Yet</h1>
        }
        <div className='w-[80%] h-[80vh] mx-auto flex flex-col gap-4 max-h-screen overflow-y-scroll'>
          {
            history ? (
              history.map((data, index) => (
                admin || !data.cancelled ? <HistoryCard history={data} key={index} setHistory={setHistory} setDisplay={setDisplay} list={history} /> : null
              ))
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default BookedDetails
