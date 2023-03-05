import { Menu } from 'antd';
import React from 'react';
import { AiOutlineHome, AiOutlineProfile, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
    const navigate = useNavigate();
    const userMenuItems = [
        {
            label: 'Home',
            key: 'home',
            icon: <AiOutlineHome size={16} />,
            onClick: () => navigate('/', { replace: true }),
        },
        {
            label: 'Apply for Doctor',
            key: 'applyForDoctor',
            icon: <FaStethoscope size={16} />,
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
            onClick: () => navigate('/apply', { replace: true }),
        },
        {
            label: 'Appionments',
            key: 'appionments',
            icon: <AiOutlineUnorderedList size={16} />,
            // className:
            //     'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
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
            defaultSelectedKeys={['home']}
            className="bg-base-100"
            items={userMenuItems}
        />
    );
}

export default UserMenu;
