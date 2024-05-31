import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from './BusCard';
import { useDispatch } from 'react-redux';
import { notifyError } from '../redux/slice';
import { IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const BusDetails = () => {
    const [buses, setBuses] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = sessionStorage.getItem('role') === '2003';
    
    useEffect(() => {
        async function fetchData() {
            try {
                let response;
                if(admin)
                    response = await axios.get(`${process.env.REACT_APP_BASE_URI}/admin/allbus`)
                else
                    response = await axios.get(`${process.env.REACT_APP_BASE_URI}/`);

                if (response.data.array)
                    setBuses(response.data.array);
                else
                    dispatch(notifyError(response.data.err))
            } catch (err) {
                dispatch(notifyError('Error Occured in Fetching Data'));
            }
        }
        fetchData();
    }, [dispatch,admin])

    return (
        <div className='max-w-screen-xl flex justify-center items-center w-full'>
            <div className='md:w-[90%] mx-auto'>
                {
                    admin ? (
                        <div className='flex justify-end'>
                            <button className='px-4 py-1 bg-blue-500 rounded-md text-white font-medium mt-2 md:mr-6' onClick={() => navigate('dashboard/addbus')}> <IonIcon icon={add} /> New</button>
                        </div>
                    ) : null
                }
                <div className='mx-auto'>
                <div className='flex flex-col sm:flex-row sm:flex-wrap justify-start h-[80vh] overflow-y-scroll pb-4 md:gap-8 md:ml-12'>
                    {
                        buses ? (
                            buses.map((bus, index) => (
                                <BusCard busDetails={bus} setBuses={setBuses} key={index} />
                            ))
                        ) : null
                    }
                </div>
                </div>
            </div>
            <ToastContainer newestOnTop autoClose={2000} />
        </div>
    )
}

export default BusDetails
