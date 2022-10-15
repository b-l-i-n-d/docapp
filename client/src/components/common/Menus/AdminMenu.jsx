import { Menu } from 'antd';
import React from 'react';
import {
    AiOutlineDashboard,
    AiOutlineProfile,
    AiOutlineUnorderedList,
    AiOutlineUser,
} from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';

function AdminMenu() {
    const adminMenuItems = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <AiOutlineDashboard size={16} />,
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Users',
            key: 'users',
            icon: <AiOutlineUser size={16} />,
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Doctors',
            key: 'doctors',
            icon: <FaStethoscope size={16} />,
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
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
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
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
