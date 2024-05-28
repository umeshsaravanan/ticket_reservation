import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminAuth = () => {
  const location = useLocation();
  const role = sessionStorage.getItem('role') || null;

  return (
    <div>
      {role === '2003' ? <Outlet /> : <Navigate to='/*' state={{ from: location }} replace />}
    </div>
  )
}

export default AdminAuth
