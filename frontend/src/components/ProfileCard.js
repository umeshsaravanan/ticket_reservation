import React from 'react'
import { IonIcon } from '@ionic/react'
import { logOutOutline, close, logInOutline, newspaperOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName, setUserRole, toggleProfile } from '../redux/slice'
import { Link, useNavigate } from 'react-router-dom'



const ProfileCard = () => {
    const redux = useSelector(state => state.slice1)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = sessionStorage.getItem('role') === '2003';

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        dispatch(setUserName(''));
        dispatch(setUserRole(false))
        navigate('/login', { replace: true })
    }
    return (
        <div className='max-w-screen-xl bg-gray-900 w-[280px] h-[420px] rounded-lg absolute top-16 right-4 flex flex-col z-30'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ef4444" d="M0,160L1440,288L1440,0L0,0Z"></path></svg>
            <div className='h-28 rounded-t-lg flex justify-evenly items-end flex-col text-white pb-10'>
                <IonIcon icon={close} className='w-6 h-6 mr-4 cursor-pointer hover:scale-[1.2] absolute top-2 text-xl' onClick={() => dispatch(toggleProfile())} />
                <h1 className='text-center text-xl font-medium mr-[110px] poetsen-one-regular'>RedBus</h1>
            </div>
            <div className='flex flex-col items-center justify-center text-white gap-2 relative bottom-10'>
                <img srcSet={redux.profile} alt='profile' className='w-24 h-24 object-cover rounded-full border-4]' />
                <h1 className='font-medium'>{redux.username !== null ? redux.username : 'Guest'}</h1>
                {redux.email ? <p>{redux.email}</p> : null}
            </div>
            <div className='flex flex-col justify-start text-white *:p-2 *:pl-4 *:flex *:items-center *:text-sm *:cursor-pointer' onClick={() => dispatch(toggleProfile())}>
                {admin ? <Link to='/dashboard' className='hover:bg-gray-800'><p className='flex items-center'><IonIcon className='mr-2 text-xl' icon={logInOutline} /> Admin</p></Link> : <Link to='/cancel' className='hover:bg-gray-800'><p className='flex items-center'><IonIcon className='mr-2 text-xl' icon={newspaperOutline} /> Bookings</p></Link>}
                {redux.username ? (
                    <p className='hover:bg-gray-800' onClick={handleLogout}><IonIcon className='mr-2 text-xl' icon={logOutOutline} /> Log Out</p>
                ) :
                    <Link to='/login' className='hover:bg-gray-800 '><p className='flex items-center'> <IonIcon className='mr-2 text-xl' icon={logInOutline} /> Log In</p></Link>}
            </div>

        </div>
    )
}

export default ProfileCard
