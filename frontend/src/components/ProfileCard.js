import React from 'react'
import { IonIcon } from '@ionic/react'
import { keyOutline, cardOutline, locationOutline, logOutOutline, pencilOutline, close, logInOutline, newspaperOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName, setUserRole, toggleProfile } from '../redux/slice'
import { Link, useNavigate } from 'react-router-dom'



const ProfileCard = () => {
    const redux = useSelector(state => state.slice1)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = sessionStorage.getItem('role') === '2003';

    const handleLogout = () =>{
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        dispatch(setUserName(''));
        dispatch(setUserRole(false))
        navigate('/login', {replace : true})
    }
    return (
        <div className='max-w-screen-xl bg-gray-900 w-[280px] h-[420px] rounded-lg absolute top-16 right-4 flex flex-col z-30'>
            <div className='bg-[#1e477e] h-28 rounded-t-lg flex justify-evenly items-end flex-col text-white'>
                <IonIcon icon={close} className='w-6 h-6 mr-4 cursor-pointer hover:scale-[1.2]' onClick={() => dispatch(toggleProfile())} />
                <h1 className='text-center text-xl font-medium mr-[110px]'>RedBus</h1>
                <IonIcon icon={pencilOutline} className='w-6 h-6 mr-4 cursor-pointer hover:scale-[1.2]' />
            </div>
            <div className='flex flex-col items-center justify-center text-white gap-2 relative bottom-10'>
                <img srcSet={redux.profile} alt='profile' className='w-24 h-24 object-cover rounded-full border-4 border-gray-900' />
                <h1 className='font-medium'>{redux.username !== null ? redux.username : 'Guest'}</h1>
                { redux.email ? <p>{redux.email}</p> : null}
                <div className="flex gap-[1rem] *:bg-[#1e477e] *:p-2 *:rounded-full text-2xl *:cursor-pointer">
                    <IonIcon icon={keyOutline} />
                    <IonIcon icon={cardOutline} />
                    <IonIcon icon={locationOutline} />
                </div>
            </div>
            <div className='flex flex-col justify-start text-white *:p-2 *:ml-4 *:flex *:items-center *:text-sm *:cursor-pointer'>
                { admin ? <Link to='/admin' className='hover:bg-gray-800' onClick={() =>dispatch(toggleProfile())}><p className='flex items-center'><IonIcon className='mr-2 text-xl' icon={logInOutline} /> Admin</p></Link> : <Link to='/cancel' className='hover:bg-gray-800' onClick={() =>dispatch(toggleProfile())}><p className='flex items-center'><IonIcon className='mr-2 text-xl' icon={newspaperOutline} /> Bookings</p></Link> }
            { redux.username ? (
                <p className='hover:bg-gray-800' onClick={handleLogout}><IonIcon className='mr-2 text-xl' icon={logOutOutline} /> Log Out</p>
                ):
                <Link to='/login' className='hover:bg-gray-800 '><p className='flex items-center'> <IonIcon className='mr-2 text-xl' icon={logInOutline} /> Log In</p></Link>}
            </div>
        </div>
    )
}

export default ProfileCard
