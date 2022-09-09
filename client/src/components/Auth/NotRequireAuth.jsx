import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function NotRequireAuth() {
    const user = useSelector((store) => store.userState.user);
    const location = useLocation();

    return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
}

export default NotRequireAuth;
