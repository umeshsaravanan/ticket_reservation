import React from 'react';
import Lottie from 'lottie-react';
import animation from '../Animations/Animation - 1717147205810.json'
import { useDispatch, useSelector } from 'react-redux';
import { toggleInfo } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
const Infocard = ({text}) => {

  const infoVisible = useSelector(state => state.slice1.infoVisible)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSeats = useSelector(state => state.slice1.selectedSeats)
  const handleClose = ()=>{
    dispatch(toggleInfo())
    navigate('/')
  }
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${infoVisible ? 'block' : 'hidden'} max-w-screen-xxl`}
      style={{ pointerEvents: infoVisible ? 'auto' : 'none' }}
    >
      <div className="absolute inset-0 bg-slate-600 bg-opacity-75 z-50 flex items-center justify-center w-screen h-screen max-w-screen-xxl">
        <div className="pt-16 md:w-[60%] md:h-[80%] w-[90%] h-[80vh] overflow-hidden relative">
        <div className='bg-white w-full h-full rounded-2xl flex flex-col gap-4 p-4'>
        <h1 className='font-bold text-center text-xl'>{text}</h1>
        <Lottie animationData={animation} className='w-[60%] h-[60%] mx-auto' />
        <div className='mx-auto flex gap-2'>
        <h1>Selected Seats : </h1>
        {selectedSeats ? selectedSeats.map((item,index) =>(
          item && <p key={index}>{ index +1 }</p>
        )) : null}
        </div>
        <button className='bg-blue-500 px-4 py-2 rounded-md w-[60%] mx-auto hover:bg-blue-600 font-medium text-white' onClick={handleClose}>Close</button>
        </div>
          </div>
          </div>
    </div>
  );
};

export default Infocard;
