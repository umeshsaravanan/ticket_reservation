import React, { useEffect } from 'react';
import axios from 'axios';
import BusCard from './BusCard';
import { useDispatch } from 'react-redux';
import { notifyError } from '../redux/slice';
import { IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useAllContext } from '../context/AllContext';

const BusDetails = () => {
    const {buses, setBusCallback, isLoading, setLoaderCallback} = useAllContext();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const admin = sessionStorage.getItem('role') === '2003';

    useEffect(() => {
        setLoaderCallback(true);
        async function fetchData() {
            try {
                let response;
                if (admin)
                    response = await axios.get(`${process.env.REACT_APP_BASE_URI}/admin/allbus`)
                else
                    response = await axios.get(`${process.env.REACT_APP_BASE_URI}/`);

                if (response.data.array)
                    setBusCallback(response.data.array);
                else
                    dispatch(notifyError(response.data.err))
            } catch (err) {
                dispatch(notifyError('Internal Server Error'));
            }
            setLoaderCallback(false);
        }
        fetchData();

        // eslint-disable-next-line
    }, [dispatch, admin])

    return (
        <div className='max-w-screen-xxl flex justify-center items-center w-full'>
            <div className='md:w-[90%] mx-auto'>
                {
                    admin ? (
                        <div className='flex justify-end'>
                            <button className='px-4 py-1 bg-blue-500 rounded-md text-white font-medium mt-2 md:mr-14' onClick={() => navigate('dashboard/addbus')}> <IonIcon icon={add} /> New</button>
                        </div>
                    ) : null
                }
                <div className='mx-auto'>
                    <div className='flex flex-col sm:flex-row sm:flex-wrap justify-start h-[80vh] overflow-y-scroll pb-4 md:gap-8 md:ml-12'>
                        {
                            isLoading ? <Loader/> : buses?.length > 0 ? buses.map((bus, index) => (
                                <BusCard busDetails={bus} setBuses={setBusCallback} key={index} />
                            )) : <p className='flex justify-center w-full p-4'>No Bus Available Currently</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusDetails
