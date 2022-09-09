import { Spin } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useVerifyTokenQuery } from '../../redux/api/authAPI';

function PresistLogin() {
    const { isLoading } = useVerifyTokenQuery();

    return isLoading ? (
        <div className="flex h-screen justify-center items-center">
            <Spin size="large" />
        </div>
    ) : (
        <Outlet />
    );
}

export default PresistLogin;
