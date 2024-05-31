import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notifyError } from '../redux/slice';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, chevronDown, chevronUp } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

const AllHistory = () => {

    const [list, setList] = useState(null);
    const [filterList, setFilterList] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllHistory() {
            try {
                const response = await axios.get('http://localhost:5001/admin/gethistory');
                if (response.data.err) {
                    dispatch(notifyError(response.data.err));
                } else {
                    setList(response.data.response);
                    setFilterList(response.data.response);
                }
            } catch (err) {
                dispatch(notifyError('Error'));
            }
        }
        getAllHistory();
    }, [dispatch]);

    const handleFilter = (val)=>{
        let newList;
        if(val !== 'all')
            newList = list.filter(li => li.cancelled === val)
        else
            newList = list
        setFilterList(newList)
    }

    return (
        <div className="flex justify-center items-center mt-4 flex-col max-w-screen-xl">
            <div className='flex justify-between w-[95%] sm:w-[90%]'>
            <IonIcon icon={arrowBackCircle} className='text-3xl cursor-pointer' onClick={() => navigate(-1)} />
            <h1 className='text-center font-medium mb-1'>Booking History</h1>
            <div className='cursor-pointer' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
            <h1 className='peer relative font-medium flex items-center'>Filter<IonIcon icon={isHover ? chevronUp : chevronDown} /></h1>
            <div className='hidden peer-hover:block hover:block absolute right-[5%]'>
                <ul className='text-start bg-slate-100 rounded-md'>
                    <li className='w-48 text-center p-2 hover:bg-slate-200' onClick={() => handleFilter('all')}>All</li>
                    <li className='w-48 text-center p-2 hover:bg-slate-200' onClick={() => handleFilter(false)}>Confirmed</li>
                    <li className='w-48 text-center p-2 hover:bg-slate-200' onClick={() => handleFilter(true)}>Cancelled</li>
                </ul>
            </div>
            </div>
            </div>
            <div className="overflow-x-scroll w-[95%] sm:w-[90%] p-2 sm:p-0 mx-auto h-[80vh] overflow-y-scroll">
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-gray-900 text-white *:px-4 *:py-2 *:border'>
                            <th className=' rounded-tl-xl border-none'>Sno</th>
                            <th>Username</th>
                            <th>Booking Id</th>
                            <th>Booked At</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Bus Name</th>
                            <th>Count</th>
                            <th>Amount</th>
                            <th className=' rounded-tr-xl border-none'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterList ? filterList.map((user, index) => (
                            <tr key={index} className="text-center hover:bg-gray-300 odd:bg-[#fefefe] even:bg-gray-100 *:px-4 *:py-2 *:border">
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user._id.substring(0, 6)}</td>
                                <td>{user.createdAt.split('T')[0]}</td>
                                <td>{user.bus.start}</td>
                                <td>{user.bus.end}</td>
                                <td>{user.bus.date.split('T')[0]}</td>
                                <td>{user.bus.busName}</td>
                                <td>{user.count}</td>
                                <td>{user.total}</td>
                                <td className={` ${user.cancelled ? 'text-red-500' : 'text-green-500'} font-semibold`}>{user.cancelled ? 'Cancelled' : 'Confirmed'}</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllHistory;
