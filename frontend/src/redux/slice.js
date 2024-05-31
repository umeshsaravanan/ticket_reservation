import { createSlice } from "@reduxjs/toolkit";
import profile from '../images/compressed.jpg';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Slice = createSlice({
    name: 'slice1',
    initialState:{
        username: sessionStorage.getItem('username') || null,
        email: null,
        profileVisible: false,
        profile: profile,
        availableSeats: null,
        selectedSeats: null,
        mapVisible : false,
        admin : sessionStorage.getItem('role') === '2003'
    },
    reducers:{
        setUserName: (state,action) =>{
            state.username = action.payload
            sessionStorage.setItem('username', state.username)
        },
        setUserEmail: (state,action) =>{
            state.email = action.payload
        },
        setUserRole: (state,action) =>{
            state.admin = action.payload
            sessionStorage.setItem('role', action.payload)
        },
        toggleProfile: (state) => {
            state.profileVisible = !state.profileVisible
        },
        toggleMap : state =>{
            state.mapVisible = !state.mapVisible;
        },
        setAvailableSeats: (state,action) =>{
            state.availableSeats = action.payload
        },
        setSelectedSeats: (state, action) =>{
            state.selectedSeats = action.payload
        },
        notifySuccess: (state,action) =>{
            toast.success(action.payload)
        },
        notifyError: (state,action) =>{
            toast.error(action.payload)
        },
        notifyWarning: (state,action) =>{
            toast.warning(action.payload)
        }
    }
})

export const {toggleProfile, setUserName, setAvailableSeats, setSelectedSeats, setUserEmail,toggleMap, setUserRole, notifySuccess, notifyWarning, notifyError} = Slice.actions

export const fetchData = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/availableseats/${id}`);
        if(response.data.err)
            dispatch(notifyError('Error'))
        dispatch(setAvailableSeats(response.data.availableSeats));
        dispatch(setSelectedSeats(response.data.availableSeats.map(seat => seat.selected)));
    } catch (err) {
        console.log("error in getting seat information: " + err);
    }
};

export default Slice.reducer