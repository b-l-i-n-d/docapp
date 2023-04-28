import { Menu } from 'antd';
import React from 'react';
import {
    AiOutlineAppstoreAdd,
    AiOutlineHome,
    AiOutlineProfile,
    AiOutlineUnorderedList,
} from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

function UserMenu() {
    const { pathname } = useLocation();
    const path = pathname.split('/').slice(0, 2).join('/');

    const userMenuItems = [
        {
            label: <NavLink to="/">Home</NavLink>,
            key: '/',
            icon: <AiOutlineHome size={16} />,
        },
        {
            label: <NavLink to="/apply">Apply For Doctor</NavLink>,
            key: '/apply',
            icon: <FaStethoscope size={16} />,
        },
        {
            label: <NavLink to="/book-appionments">Book Appionments</NavLink>,
            key: '/book-appionments',
            icon: <AiOutlineAppstoreAdd size={16} />,
        },
        {
            label: <NavLink to="/appointments">Appointments</NavLink>,
            key: '/appointments',
            icon: <AiOutlineUnorderedList size={16} />,
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineProfile size={16} />,
        },
    ];

    return <Menu mode="inline" selectedKeys={[path]} items={userMenuItems} />;
}

export default UserMenu;
