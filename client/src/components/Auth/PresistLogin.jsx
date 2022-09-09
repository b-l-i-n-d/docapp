import React from 'react';
import { Outlet } from 'react-router-dom';
import { useVerifyTokenQuery } from '../../redux/api/authAPI';

function PresistLogin() {
    const { isLoading } = useVerifyTokenQuery();

    return !isLoading && <Outlet />;
}

export default PresistLogin;
