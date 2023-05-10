import { Avatar, Badge, Dropdown, Layout, Menu, Space, Switch, notification } from 'antd';
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
    const notifications = useSelector((store) => store.userState.notification);
    const [collapsed, setCollapsed] = useState(false);
    const [logOutUser, { isLoading: isLogOutLoading, error: logOutError }] =
        useLazyLogoutUserQuery();

    const { error } = useGetNotificationQuery(undefined, {
        skip: !user,
        pollingInterval: 10000,
    });

    const themeChange = (checked) => {
        if (checked) {
            dispatch(setTheme(themeConfig.DARK));
        } else {
            dispatch(setTheme(themeConfig.LIGHT));
        }
    };

    const dropDownMenuItems = [
        {
            label: 'Logout',
            key: 'logout',
            icon: <AiOutlineLogout size={16} />,
            onClick: () => logOutUser(),
        },
    ];

    useEffect(() => {
        if (logOutError) {
            notification.error({
                message: logOutError?.data ? logOutError.data.error : 'Can not connect to server.',
                description: logOutError?.data
                    ? logOutError?.data.description
                    : 'Please try again.',
            });
        }
    }, [logOutError]);

    useEffect(() => {
        if (error) {
            notification.error({
                message: error?.data ? error?.data.error : 'Can not connect to server.',
                description: error?.data ? error?.data.description : 'Please try again.',
            });
        }
    }, [error, logOutError]);

    return isLogOutLoading ? (
        <Common.LoaderOverlay />
    ) : (
        <Layout hasSider className="min-h-screen shadow-sm shadow-black">
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    borderRight: currentTheme === themeConfig.DARK ? '1px solid #313131' : 'none',
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

                {user.role === 'admin' && <Common.Menus.AdminMenu />}
                {user.role === 'user' && user.isDoctor !== 'no' && user.isDoctor !== 'pending' && (
                    <Common.Menus.DoctorMenu />
                )}
                {user.role === 'user' &&
                    (user.isDoctor === 'no' || user.isDoctor === 'pending') && (
                        <Common.Menus.UserMenu />
                    )}
            </Sider>
            <Layout
                className="site-layout transition-all duration-300 shadow-sm shadow-black"
                style={{ marginLeft: collapsed ? 80 : 200 }}
            >
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        width: '100%',
                        backgroundColor: currentTheme === themeConfig.DARK ? '#141414' : '#fff',
                        borderBottom:
                            currentTheme === themeConfig.DARK ? '1px solid #313131' : 'none',
                    }}
                    className={`${collapsed ? 'w-[calc(100%_-_80px)]' : 'w-[calc(100%_-_200px)]'} ${
                        currentTheme === themeConfig.DARK ? 'bg-black' : 'bg-base-100'
                    } px-5 transition-all duration-300 z-10 space-x-2`}
                >
                    <Menu
                        className="float-right"
                        disabledOverflow
                        mode="horizontal"
                        selectable={false}
                    >
                        <Menu.Item key="0">
                            <Switch
                                checked={currentTheme === themeConfig.DARK}
                                onChange={themeChange}
                                checkedChildren={<MdOutlineLightMode />}
                                unCheckedChildren={<MdOutlineDarkMode />}
                            />
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Dropdown
                                // eslint-disable-next-line react/no-unstable-nested-components
                                dropdownRender={() => (
                                    <Common.Notifications notificationData={notifications} />
                                )}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <Badge count={notifications?.unSeenNotification?.length}>
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
