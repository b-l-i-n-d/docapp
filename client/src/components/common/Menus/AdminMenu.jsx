import { Menu } from 'antd';
import React from 'react';
import {
    AiOutlineDashboard,
    AiOutlineProfile,
    AiOutlineUnorderedList,
    AiOutlineUser,
} from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminMenu() {
    const navigate = useNavigate();
    const adminMenuItems = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <AiOutlineDashboard size={16} />,
            onClick: () => navigate('/', { replace: true }),
        },
        {
            label: 'Users',
            key: 'users',
            icon: <AiOutlineUser size={16} />,
        },
        {
            label: 'Doctors',
            key: 'doctors',
            icon: <FaStethoscope size={16} />,
            onClick: () => navigate('/doctors', { replace: true }),
        },
        {
            label: 'Departments',
            key: 'departments',
            icon: <AiOutlineUnorderedList size={16} />,
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineProfile size={16} />,
        },
    ];
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            className="bg-base-100"
            items={adminMenuItems}
        />
    );
}

export default AdminMenu;
