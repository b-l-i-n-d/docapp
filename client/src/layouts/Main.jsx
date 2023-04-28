import { Avatar, Badge, Dropdown, Layout, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineBell, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { themeChange } from 'theme-change';
import Logo from '../assets/logos/withoutText/docapp_light.svg';
import { Common } from '../components';
import { useLazyLogoutUserQuery } from '../redux/api/authAPI';
import { useGetNotificationQuery } from '../redux/api/userAPI';

const { Header, Content, Footer, Sider } = Layout;

function Main() {
    useEffect(() => {
        themeChange(false);
    }, []);

    // const theme = localStorage.getItem('theme');
    const user = useSelector((store) => store.userState.user);
    const notification = useSelector((store) => store.userState.notification);
    const [collapsed, setCollapsed] = useState(false);
    const [logOutUser, { isLoading: isLogOutLoading, error: logOutError }] =
        useLazyLogoutUserQuery();

    const { isLoading, error } = useGetNotificationQuery(undefined, {
        pollingInterval: 10000,
    });

    useEffect(() => {
        if (logOutError) {
            notification.open({
                className:
                    'bg-base-100 rounded-2xl text-base-content antdNotificationMessage antdNotificationClose shadow-lg shadow-primary/30',
                type: 'error',
                message: logOutError.data ? logOutError.data.error : 'Can not connect to server.',
                description: logOutError.data ? logOutError.data.description : 'Please try again.',
                placement: 'bottomRight',
            });
        }
        if (error) {
            notification.open({
                className:
                    'bg-base-100 rounded-2xl text-base-content antdNotificationMessage antdNotificationClose shadow-lg shadow-primary/30',
                type: 'error',
                message: logOutError.data ? logOutError.data.error : 'Can not connect to server.',
                description: logOutError.data ? logOutError.data.description : 'Please try again.',
                placement: 'bottomRight',
            });
        }
    }, [logOutError, isLogOutLoading, notification, isLoading, error]);

    const dropDownMenuItems = [
        {
            label: 'Profile',
            key: 'profile',
            icon: <AiOutlineUser size={16} />,
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <AiOutlineLogout size={16} />,
            onClick: () => logOutUser(),
        },
    ];

    return isLogOutLoading ? (
        <Common.LoaderOverlay />
    ) : (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
                className="z-10 bg-base-100 text-base-content shadow-sm shadow-primary/20"
            >
                <div className="flex items-center pl-6 p-4">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                    {!collapsed && <h1 className="ml-1 font-bold text-primary">DOCAPP</h1>}
                </div>

                {user.role === 'admin' ? <Common.Menus.AdminMenu /> : <Common.Menus.UserMenu />}
            </Sider>
            <Layout
                className="site-layout transition-all duration-300"
                style={{ marginLeft: collapsed ? 70 : 190 }}
            >
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                    }}
                    className={`${
                        collapsed ? 'w-[calc(100%_-_80px)]' : 'w-[calc(100%_-_200px)]'
                    } bg-base-100 py-0 px-5 transition-all duration-300 shadow-sm shadow-primary/20 z-10 space-x-2 flex items-center justify-end`}
                >
                    <Badge count={notification?.unSeenNotification?.length}>
                        <Dropdown
                            className="cursor-pointer hover:bg-base-200 h-full"
                            // eslint-disable-next-line react/no-unstable-nested-components
                            dropdownRender={() => (
                                <Common.Notifications notificationData={notification} />
                            )}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <AiOutlineBell size={24} />
                        </Dropdown>
                    </Badge>

                    {/* <ThemeSwitch theme={theme} /> */}

                    <Dropdown
                        className="hover:bg-base-300 px-3 bg-base-100 cursor-pointer hover:text-primary-content "
                        // overlay={menu}
                        menu={{ items: dropDownMenuItems }}
                        placement="bottomRight"
                    >
                        <Space>
                            <Avatar>
                                <AiOutlineUser size={32} />
                            </Avatar>
                            <h1 className="text-base-content font-bold m-0">{user.name}</h1>
                        </Space>
                    </Dropdown>
                </Header>
                <Content className="text-base-content bg-base-200">
                    <div className="m-5">
                        <Outlet />
                    </div>
                </Content>
                <Footer className="text-center">DOCAPP @2023</Footer>
            </Layout>
        </Layout>
    );
}

export default Main;
