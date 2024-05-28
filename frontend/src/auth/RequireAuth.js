import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
    const username = useSelector(state => state.slice1.username)
    const location = useLocation();
    
  return (
    <div>
        {username ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace /> }
    </div>
  )
}

export default RequireAuth
