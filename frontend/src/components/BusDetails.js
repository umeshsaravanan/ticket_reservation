import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from './BusCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { notifyError } from '../redux/slice';

const BusDetails = () => {
    const [buses, setBuses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get('http://localhost:5001/');
                if(response.data.array)
                    setBuses(response.data.array);
                else
                    dispatch(notifyError(response.data.err))
            }catch(err){
                dispatch(notifyError(err));
            }
        }
        fetchData();
    }, [dispatch])

    const handleBooking = (id) =>{
        navigate(`/booking/${id}`);
    }

    return (
        <div className='max-w-screen-xl h-full flex justify-center pb-4 w-full'>
            <div className='md:w-[80%] mx-auto min-h-screen'>
            <div className='flex flex-col flex-wrap md:flex-row justify-start'>
                {
                    buses ? (
                        buses.map((bus, index) => (
                            <div onClick={()=>handleBooking(bus._id)} key={index}><BusCard busDetails={bus}/></div>
                        ))
                    ) : null
                }
            </div>
            </div>
        </div>
    )
}

export default BusDetails
