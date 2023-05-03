import { Menu } from 'antd';
import React from 'react';
import {
    AiOutlineAppstoreAdd,
    AiOutlineHome,
    AiOutlineProfile,
    AiOutlineUnorderedList,
} from 'react-icons/ai';
import { BsJournalMedical } from 'react-icons/bs';
import { FaMedkit, FaStethoscope } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

function DoctorMenu() {
    const { pathname } = useLocation();
    const path = pathname.split('/').slice(0, 2).join('/');
    const doctorMenuItems = [
        {
            label: <NavLink to="/">Home</NavLink>,
            key: '/',
            icon: <AiOutlineHome size={16} />,
        },
        {
            label: <NavLink to="/apply">Doctor Profile</NavLink>,
            key: '/apply',
            icon: <FaStethoscope size={16} />,
        },
        {
            label: <NavLink to="/book-appionments">Book Appionments</NavLink>,
            key: '/book-appionments',
            icon: <AiOutlineAppstoreAdd size={16} />,
        },
        {
            label: (
                <NavLink className="text-inherit hover:text-inherit" to="/appointments">
                    Appointments
                </NavLink>
            ),
            key: '/appointments',
            icon: <AiOutlineUnorderedList size={16} />,
            children: [
                {
                    label: <NavLink to="/appointments/personal">Personal</NavLink>,
                    key: '/appointments/personal',
                    icon: <FaMedkit size={16} />,
                },
                {
                    label: <NavLink to="/appointments/patient">Patient</NavLink>,
                    key: '/appointments/patient',
                    icon: <BsJournalMedical size={16} />,
                },
            ],
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineProfile size={16} />,
        },
    ];

    return <Menu mode="inline" selectedKeys={[path]} items={doctorMenuItems} />;
}

export default DoctorMenu;
