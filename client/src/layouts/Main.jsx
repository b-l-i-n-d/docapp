import { Avatar, Badge, Dropdown, Layout, Menu, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineBell, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/logos/withoutText/docapp_light.svg';
import { Common } from '../components';
import { themeConfig } from '../configs';
import { useLazyLogoutUserQuery } from '../redux/api/authAPI';
import { useGetNotificationQuery } from '../redux/api/userAPI';
import { setTheme } from '../redux/features/themes/themeSlice';
import { useAppDispatch } from '../redux/hooks';

const { Header, Content, Footer, Sider } = Layout;

function Main() {
    const dispatch = useAppDispatch();
    const currentTheme = useSelector((state) => state.theme.theme);
    const user = useSelector((store) => store.userState.user);
    const notification = useSelector((store) => store.userState.notification);
    const [collapsed, setCollapsed] = useState(false);
    const [logOutUser, { isLoading: isLogOutLoading, error: logOutError }] =
        useLazyLogoutUserQuery();

    const { isLoading, error } = useGetNotificationQuery(undefined, {
        pollingInterval: 10000,
    });

    const themeChange = (checked) => {
        if (checked) {
            dispatch(setTheme(themeConfig.dark));
        } else {
            dispatch(setTheme(themeConfig.light));
        }
    };

    useEffect(() => {
        if (logOutError) {
            notification.error({
                message: logOutError?.data ? logOutError.data.error : 'Can not connect to server.',
                description: logOutError?.data
                    ? logOutError?.data.description
                    : 'Please try again.',
                placement: 'bottomRight',
            });
        }
        if (error) {
            notification.error({
                message: logOutError?.data ? logOutError?.data.error : 'Can not connect to server.',
                description: logOutError?.data
                    ? logOutError?.data.description
                    : 'Please try again.',
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
        <Layout hasSider className="min-h-screen">
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
                className="z-10"
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
                        zIndex: 10,
                        width: '100%',
                    }}
                    className={`${collapsed ? 'w-[calc(100%_-_80px)]' : 'w-[calc(100%_-_200px)]'} ${
                        currentTheme === themeConfig.dark ? 'bg-black' : 'bg-base-100'
                    } px-5 transition-all duration-300 shadow-sm shadow-primary/20 z-10 space-x-2`}
                >
                    <Menu
                        className="float-right"
                        disabledOverflow
                        mode="horizontal"
                        selectable={false}
                    >
                        <Menu.Item key="3">
                            <Switch
                                checked={currentTheme === themeConfig.dark}
                                onChange={themeChange}
                                checkedChildren={<MdOutlineLightMode />}
                                unCheckedChildren={<MdOutlineDarkMode />}
                            />
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Dropdown
                                // eslint-disable-next-line react/no-unstable-nested-components
                                dropdownRender={() => (
                                    <Common.Notifications notificationData={notification} />
                                )}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <Badge count={notification?.unSeenNotification?.length}>
                                    <Space>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }}
                                        >
                                            <AiOutlineBell size={32} />
                                        </Avatar>
                                    </Space>
                                </Badge>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Dropdown menu={{ items: dropDownMenuItems }} placement="bottomRight">
                                <Space>
                                    <Avatar>
                                        <AiOutlineUser size={32} />
                                    </Avatar>
                                    <h1 className="font-bold m-0">{user.name}</h1>
                                </Space>
                            </Dropdown>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
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
