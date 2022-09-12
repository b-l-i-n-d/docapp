import React from 'react';
import { Outlet } from 'react-router-dom';
import { useVerifyTokenQuery } from '../../redux/api/authAPI';
import { LoaderOverlay } from '../common';

function PresistLogin() {
    const { isLoading } = useVerifyTokenQuery();

    return isLoading ? <LoaderOverlay /> : <Outlet />;
}

export default PresistLogin;
