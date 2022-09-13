import { Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import React, { createElement, useEffect, useState } from 'react';
import {
    AiOutlineAppstore,
    AiOutlineBarChart,
    AiOutlineCloud,
    AiOutlineLogout,
    AiOutlineShop,
    AiOutlineTeam,
    AiOutlineUpload,
    AiOutlineUser,
    AiOutlineVideoCamera
} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { themeChange } from 'theme-change';
import Logo from '../assets/logos/withoutText/docapp_light.svg';
import LoadeerOverlay from '../components/common/LoaderOverlay';
import ThemeSwitch from '../components/common/themes/ThemeSwitch';
import { useLogoutUserQuery } from '../redux/api/authAPI';

const { Header, Content, Footer, Sider } = Layout;
const items = [
    AiOutlineAppstore,
    AiOutlineBarChart,
    AiOutlineCloud,
    AiOutlineShop,
    AiOutlineTeam,
    AiOutlineUpload,
    AiOutlineUser,
    AiOutlineVideoCamera,
].map((icon, index) => ({
    key: String(index + 1),
    icon: createElement(icon),
    label: `nav ${index + 1}`,
}));

// const menu = () => {
//     const menuItems = [
//         { label: 'Profile', key: 'profile', icon: <AiOutlineUser /> },
//         {
//             label: 'Logout',
//             key: 'logout',
//             icon: <AiOutlineLogout />,
//         },
//     ];
//     return <Menu className="bg-base-100" items={menuItems} />;
// };

function Home() {
    useEffect(() => {
        themeChange(false);
    }, []);

    const theme = localStorage.getItem('theme');
    const user = useSelector((store) => store.userState.user);
    const [collapsed, setCollapsed] = useState(false);
    const [isNotLoggedout, setIsNotLoggedout] = useState(true);
    const { isLoading, error } = useLogoutUserQuery(undefined, { skip: isNotLoggedout });

    const menu = () => {
        const menuItems = [
            { label: 'Profile', key: 'profile', icon: <AiOutlineUser /> },
            {
                label: 'Logout',
                key: 'logout',
                icon: <AiOutlineLogout />,
                onClick: () => setIsNotLoggedout(false),
            },
        ];
        return <Menu className="bg-base-100" items={menuItems} />;
    };

    return isLoading ? (
        <LoadeerOverlay />
    ) : (
        <Layout hasSider>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
                className="overflow-auto h-screen fixed left-0 top-0 bottom-0 z-10 bg-base-100 text-base-content"
            >
                <div className="flex items-center p-4">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                    <h1 className="ml-1 font-bold text-primary">DOCAPP</h1>
                </div>

                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout
                className="site-layout transition-all duration-300"
                style={{ margin: collapsed ? '0 0 0 80px' : '0 0 0 200px' }}
            >
                <Header className="bg-base-100 fixed flex justify-end items-center w-[calc(100%_-_200px)] py-0 px-0">
                    <ThemeSwitch theme={theme} />
                    <Dropdown
                        className="hover:bg-base-200 px-3 ml-2 bg-base-100"
                        overlay={menu}
                        placement="bottomRight"
                    >
                        <Space>
                            <Avatar>{user.name.charAt(0)}</Avatar>
                            <h1 className="text-base-content font-bold">{user.name}</h1>
                        </Space>
                    </Dropdown>
                </Header>
                <Content className="mx-0 mt-16 mb-4">
                    <div className="site-layout-background text-center mx-0 my-4">
                        <p>{user.name}</p>
                        {
                            // indicates very long content
                            Array.from(
                                {
                                    length: 100,
                                },
                                (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index ? 'more' : '...'}
                                        <br />
                                    </React.Fragment>
                                )
                            )
                        }
                    </div>
                </Content>
                <Footer className="text-center">Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default Home;
