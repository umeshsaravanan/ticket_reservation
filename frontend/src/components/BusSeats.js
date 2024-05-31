import { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { ellipseOutline, ellipse } from 'ionicons/icons';
import React from 'react';
import { fetchData, setSelectedSeats } from '../redux/slice';
import { useParams } from 'react-router-dom';

const BusSeats = () => {
    const [activeIcons, setActiveIcons] = useState(Array(8).fill(false)); // Adjusted to 32 for a 4x8 grid
    const dispatch = useDispatch();
    const seatInfo = useSelector(state => state.slice1.availableSeats);
    const selectedSeats = useSelector(state => state.slice1.selectedSeats);
    const admin = sessionStorage.getItem('role') === '2003'
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchData(id))
    }, [dispatch, id]);

    const toggleIcon = (index) => {
        const newActiveIcons = [...activeIcons];
        newActiveIcons[index] = !newActiveIcons[index];
        setActiveIcons(newActiveIcons);

        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats[index-1] = !newSelectedSeats[index-1];
        dispatch(setSelectedSeats(newSelectedSeats));
    };

    return (
        <div className='px-4 py-10 mx-auto my-4 w-[200px] h-[400px] bg-slate-300 border border-1 border-black rounded-md space-y-4 shadow-md'>
            {seatInfo ? [...Array(8)].map((_, index) => (
                <div key={index} className='flex justify-between'>
                    <div className='flex gap-1 relative'>
                        <IonIcon
                            icon={seatInfo[(4 * index) + 0] || activeIcons[(4 * index) + 1] ? ellipse : ellipseOutline}
                            className={`text-2xl ${ admin ? 'cursor-not-allowed' : ''} ${seatInfo[(4 * index) + 0] ? 'text-red-400 cursor-not-allowed' : activeIcons[(4 * index) + 1] ? 'text-green-400' : ''} cursor-pointer`}
                            onClick={() =>!admin && !seatInfo[(4 * index) + 0] && toggleIcon((4 * index) + 1)}
                        />
                        <p className='absolute font-medium text-[10px] top-6 left-2'>{(4 * index) + 1}</p>
                        <IonIcon
                            icon={seatInfo[(4 * index) + 1] || activeIcons[(4 * index) + 2] ? ellipse : ellipseOutline}
                            className={`text-2xl ${ admin ? 'cursor-not-allowed' : ''} ${seatInfo[(4 * index) + 1] ? 'text-red-400 cursor-not-allowed' : activeIcons[(4 * index) + 2] ? 'text-green-400' : ''} cursor-pointer`}
                            onClick={() =>!admin && !seatInfo[(4 * index) + 1] && toggleIcon((4 * index) + 2)}
                        />
                        <p className='absolute font-medium text-[10px] top-6 left-9'>{(4 * index) + 2}</p>
                    </div>
                    <div className='flex gap-1 relative'>
                        <IonIcon
                            icon={seatInfo[(4 * index) + 2] || activeIcons[(4 * index) + 3] ? ellipse : ellipseOutline}
                            className={`text-2xl ${ admin ? 'cursor-not-allowed' : ''} ${seatInfo[(4 * index) + 2] ? 'text-red-400 cursor-not-allowed' : activeIcons[(4 * index) + 3] ? 'text-green-400' : ''} cursor-pointer`}
                            onClick={() =>!admin && !seatInfo[(4 * index) + 2] && toggleIcon((4 * index) + 3)}
                        />
                        <p className='absolute font-medium left-2 text-[10px] top-6'>{(4 * index) + 3}</p>
                        <IonIcon
                            icon={seatInfo[(4 * index) + 3] || activeIcons[(4 * index) + 4] ? ellipse : ellipseOutline}
                            className={`text-2xl ${ admin ? 'cursor-not-allowed' : ''} ${seatInfo[(4 * index) + 3] ? 'text-red-400 cursor-not-allowed' : activeIcons[(4 * index) + 4] ? 'text-green-400' : ''} cursor-pointer`}
                            onClick={() =>!admin && !seatInfo[(4 * index) + 3] && toggleIcon((4 * index) + 4)}
                        />
                        <p className='absolute font-medium left-9 text-[10px] top-6'>{(4 * index) + 4}</p>
                    </div>
                </div>
            )) : null}
        </div>
    );
};

export default BusSeats;
