import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import User from './User';

function Home() {
    const user = useSelector((store) => store.userState.user);

    return user.role === 'admin' ? <Navigate to="/dashboard" replace /> : <User.Home />;
}

export default Home;
