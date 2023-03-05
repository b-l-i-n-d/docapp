import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AdminOnly() {
    const user = useSelector((store) => store.userState.user);
    const location = useLocation();

    return user.role === 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to="/home" state={{ from: location }} replace />
    );
}

export default AdminOnly;
