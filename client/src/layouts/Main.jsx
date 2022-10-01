import { Avatar, Dropdown, Layout, Menu, notification, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    AiOutlineDashboard,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineProfile,
    AiOutlineUnorderedList,
    AiOutlineUser
} from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { themeChange } from 'theme-change';
import Logo from '../assets/logos/withoutText/docapp_light.svg';
import LoadeerOverlay from '../components/common/LoaderOverlay';
import ThemeSwitch from '../components/common/themes/ThemeSwitch';
import { useLogoutUserQuery } from '../redux/api/authAPI';

const { Header, Content, Footer, Sider } = Layout;

function Main() {
    useEffect(() => {
        themeChange(false);
    }, []);

    const theme = localStorage.getItem('theme');
    const user = useSelector((store) => store.userState.user);
    const [collapsed, setCollapsed] = useState(false);
    const [isNotLoggedout, setIsNotLoggedout] = useState(true);
    const { isLoading, error } = useLogoutUserQuery(undefined, { skip: isNotLoggedout });

    useEffect(() => {
        if (error) {
            console.log(error);
            notification.open({
                className:
                    'bg-base-100 rounded-2xl text-base-content antdNotificationMessage antdNotificationClose shadow-lg shadow-primary/30',
                type: 'error',
                message: error.data ? error.data.error : 'Can not connect to server.',
                description: error.data ? error.data.description : 'Please try again.',
                placement: 'bottomRight',
            });
        }
    }, [error, isLoading]);

    const menu = () => {
        const menuItems = [
            {
                label: 'Profile',
                key: 'profile',
                icon: <AiOutlineUser size={16} />,
                className:
                    'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content rounded',
            },
            {
                label: 'Logout',
                key: 'logout',
                icon: <AiOutlineLogout size={16} />,
                className:
                    'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content rounded',
                onClick: () => setIsNotLoggedout(false),
            },
        ];
        return <Menu className="bg-base-100 rounded-md" items={menuItems} />;
    };

    const userMenuItems = [
        {
            label: 'Home',
            key: 'home',
            icon: <AiOutlineHome size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Apply for Doctor',
            key: 'applyForDoctor',
            icon: <FaStethoscope size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Appionments',
            key: 'appionments',
            icon: <AiOutlineUnorderedList size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineProfile size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
    ];

    const adminMenuItems = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <AiOutlineDashboard size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Users',
            key: 'users',
            icon: <AiOutlineUser size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Doctors',
            key: 'doctors',
            icon: <FaStethoscope size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineProfile size={16} />,
            className:
                'bg-base-100 text-base-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-contsnt',
        },
    ];

    return isLoading ? (
        <LoadeerOverlay />
    ) : (
        <Layout hasSider>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
                className="overflow-auto h-screen fixed left-0 top-0 bottom-0 z-10 bg-base-100 text-base-content shadow-sm shadow-primary/20"
            >
                <div className="flex items-center p-4">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                    <h1 className="ml-1 font-bold text-primary">DOCAPP</h1>
                </div>

                {user.role === 'admin' ? (
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        className="bg-base-100"
                        items={adminMenuItems}
                    />
                ) : (
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['doctors']}
                        className="bg-base-100"
                        items={userMenuItems}
                    />
                )}
            </Sider>
            <Layout
                className="site-layout transition-all duration-300"
                style={{ margin: collapsed ? '0 0 0 80px' : '0 0 0 200px' }}
            >
                <Header
                    className={`${
                        collapsed ? 'w-[calc(100%_-_80px)]' : 'w-[calc(100%_-_200px)]'
                    } bg-base-100 fixed flex justify-end items-center py-0 px-5 transition-all duration-300 shadow-sm shadow-primary/20`}
                >
                    <ThemeSwitch theme={theme} />
                    <Dropdown
                        className="hover:bg-base-300 h-12 px-3 ml-2 bg-base-100 cursor-pointer rounded-md hover:text-primary-content shadow-sm shadow-primary/30"
                        overlay={menu}
                        placement="bottomRight"
                    >
                        <Space>
                            <Avatar>
                                <AiOutlineUser size={32} />
                            </Avatar>
                            <h1 className="text-base-content font-bold text-lg">{user.name}</h1>
                        </Space>
                    </Dropdown>
                </Header>
                <Content className="mx-0 mt-16 mb-4 text-base-content bg-base-200">
                    {/* Outlet */}

                    <Outlet />
                </Content>
                <Footer className="text-center">Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default Main;
