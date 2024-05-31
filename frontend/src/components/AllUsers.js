import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notifyError, notifySuccess } from '../redux/slice';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AllUsers = () => {

    const [list, setList] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllUsers() {
            try {
                const response = await axios.get(`${process.env.BASE_URI}/admin/getusers`);
                if (response.data.err) {
                    dispatch(notifyError('Error in getting Users'));
                } else {
                    setList(response.data.response);
                }
            } catch (err) {
                dispatch(notifyError('Error occured'));
            }
        }
        getAllUsers();
    }, [dispatch]);

    const handleRemove = async (id)=>{
        try{
            const response = await axios.delete(`http://localhost:5001/admin/deleteuser/${id}`)
            if(response.data.msg){
                dispatch(notifySuccess('Deleted Successfully'))
                setList(prev => prev.filter(user => user._id !== id))                
            }else{
                dispatch(notifyError('Error Occured Try Again'))
            }
        }catch(err){
            dispatch(notifyError('Error Occured'))
        }
    }

    return (
        <div className="flex justify-center items-center mt-4 flex-col max-w-screen-xl">
            <div className='flex justify-between w-[95%] sm:w-[90%]'>
            <div className='flex-1'>
            <IonIcon icon={arrowBackCircle} className='text-3xl cursor-pointer' onClick={() => navigate(-1)} />
            </div>
            <h1 className='font-medium mb-1 flex-1 basis-[10%]'>Users</h1>
            </div>
            <div className="overflow-x-scroll w-[95%] sm:w-[90%] p-2 sm:p-0 mx-auto h-[80vh] overflow-y-scroll">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-gray-900 text-white *:px-4 *:py-2 *:border'>
                            <th className=' rounded-tl-xl border-none'>Sno</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th className=' rounded-tr-xl border-none'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list ? list.map((user, index) => (
                            <tr key={index} className="text-center hover:bg-gray-300 odd:bg-[#fefefe] even:bg-gray-100 *:px-4 *:py-2 *:border">
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td className='cursor-pointer hover:text-red-500 hover:underline duration-200' onClick={() => handleRemove(user._id)}>Remove</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>
            <ToastContainer newestOnTop autoClose={2000} />
        </div>
    );
}

export default AllUsers;
