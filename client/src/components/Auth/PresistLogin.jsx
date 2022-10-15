import React from 'react';
import { Outlet } from 'react-router-dom';
import { useVerifyTokenQuery } from '../../redux/api/authAPI';
import { Common } from '../index';

function PresistLogin() {
    const { isLoading } = useVerifyTokenQuery();

    return isLoading ? <Common.LoaderOverlay /> : <Outlet />;
}

export default PresistLogin;
