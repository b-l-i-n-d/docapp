import { Menu } from 'antd';
import React from 'react';
import {
    AiOutlineDashboard,
    AiOutlineProfile,
    AiOutlineUnorderedList,
    AiOutlineUser,
} from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

function AdminMenu() {
    const { pathname } = useLocation();

    const adminMenuItems = [
        {
            label: <NavLink to="/">Dashboard</NavLink>,
            key: '/',
            icon: <AiOutlineDashboard size={16} />,
        },
        {
            label: <NavLink to="/users">Users</NavLink>,
            key: '/users',
            icon: <AiOutlineUser size={16} />,
        },
        {
            label: <NavLink to="/doctors">Doctors</NavLink>,
            key: '/doctors',
            icon: <FaStethoscope size={16} />,
        },
        {
            label: <NavLink to="/departments">Departments</NavLink>,
            key: '/departments',
            icon: <AiOutlineUnorderedList size={16} />,
        },
        {
            label: 'Profile',
            key: '/profile',
            icon: <AiOutlineProfile size={16} />,
        },
    ];
    return <Menu mode="inline" selectedKeys={[pathname]} items={adminMenuItems} />;
}

export default AdminMenu;
