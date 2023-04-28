import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useVerifyTokenQuery } from '../../redux/api/authAPI';
import { Common } from '../index';

function PresistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.userState.user);
    const { isLoading: isLoadingVerifyToken } = useVerifyTokenQuery();

    useEffect(() => {
        if (user && !isLoadingVerifyToken) {
            setIsLoading(false);
        }
        if (!user && !isLoadingVerifyToken) {
            setIsLoading(false);
        }
    }, [isLoadingVerifyToken, user]);

    return isLoading ? <Common.LoaderOverlay /> : <Outlet />;
}

export default PresistLogin;
