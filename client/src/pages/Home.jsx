import { Layout, Menu } from 'antd';
import React, { createElement, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    AiOutlineAppstore,
    AiOutlineBarChart,
    AiOutlineCloud,
    AiOutlineShop,
    AiOutlineTeam,
    AiOutlineUpload,
    AiOutlineUser,
    AiOutlineVideoCamera,
} from 'react-icons/ai';

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

function Home() {
    const user = useSelector((store) => store.userState.user);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout hasSider>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="light"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                <div className="logo" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout
                className="site-layout transition-all duration-300"
                style={{ margin: collapsed ? '0 0 0 80px' : '0 0 0 200px' }}
            >
                <Header
                    style={{
                        position: 'fixed',
                        width: '100%',
                        padding: 0,
                    }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={new Array(3).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: `nav ${index + 1}`,
                        }))}
                    />
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                        overflow: 'initial',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            margin: '0 16px',
                            textAlign: 'center',
                        }}
                    >
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
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Home;
