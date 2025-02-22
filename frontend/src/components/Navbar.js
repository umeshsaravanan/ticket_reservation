import React, { useEffect, useRef } from 'react'
import { IonIcon } from '@ionic/react'
import { bus, home } from 'ionicons/icons'
import profile from '../images/compressed.jpg'
import ProfileCard from './ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import { toggleProfile } from '../redux/slice'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const redux = useSelector(state => state.slice1)
    const dispatch = useDispatch();
    const cardRef = useRef(null);
    const profileRef = useRef(null);
    const role = sessionStorage.getItem('role') === '2003';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target) && profileRef.current && !profileRef.current.contains(event.target)) {
                if (redux.profileVisible) {
                    dispatch(toggleProfile());
                }
            }
        };

        if (redux.profileVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [redux.profileVisible, dispatch]);

    return (
        <div className='max-w-screen-xxl bg-[#fefefe] shadow-md p-2 sticky top-0 z-10'>
            <div className='flex justify-between items-center p-1'>
                <div className='flex gap-1 items-center poetsen-one-regular'>
                    <IonIcon icon={bus} className='text-2xl text-red-500' />
                    <Link to='/'><h1 className='font-bold text-2xl cursor-pointer'>busTop</h1></Link>
                </div>
                <div className='flex gap-2 items-center'>
                    {!redux.username && <Link to='/login' className='bg-blue-500 hover:bg-blue-600 p-1 rounded-md text-white'>Sign in</Link>}
                    {role ? ( <Link to='/dashboard' className='text-lg mx-2 font-bold hover:text-red-500 duration-200'> <IonIcon icon={home} className='text-sm' /> Home</Link>) : null}
                    <p className='hidden sm:block'>{redux.username ? redux.username : 'Guest'}</p>
                    <img srcSet={profile} alt="profile" ref={profileRef} className='w-8 h-8 object-fit rounded-full cursor-pointer border border-1 border-[#ef4444]' onClick={() => dispatch(toggleProfile())} />
                </div>
            </div>
            {redux.profileVisible ? <div ref={cardRef}><ProfileCard /></div> : null}
        </div>
    )
}

export default Navbar
