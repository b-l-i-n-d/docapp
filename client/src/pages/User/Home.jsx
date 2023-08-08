import { AppstoreAddOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Doctor } from '../../components';

function Home() {
    const isDoctor = useSelector((state) => state.userState.user.isDoctor);

    return isDoctor !== 'no' && isDoctor !== 'pending' ? (
        <Doctor.Dashboard />
    ) : (
        <Card
            style={{
                backgroundColor: 'transparent',
            }}
        >
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} md={12} lg={6}>
                    <Link to="/apply">
                        <Card
                            className="group hover:shadow-xl hover:shadow-primary/30 transition-all duration-150 ease-linear"
                            bodyStyle={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 16,
                                textAlign: 'center',
                            }}
                            style={{
                                height: 300,
                            }}
                        >
                            <UserAddOutlined
                                className="p-4 rounded-2xl  bg-purple-200 border-solid border-4 border-transparent transition-all duration-150
                            ease-linear text-black group-hover:border-4 group-hover:border-purple-500"
                                style={{ fontSize: 40 }}
                            />
                            <Typography.Title level={4}>Apply for doctor account</Typography.Title>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <Link to="/book-appointments">
                        <Card
                            className="group hover:shadow-xl hover:shadow-primary/30 transition-all duration-150 ease-linear"
                            bodyStyle={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 16,
                                textAlign: 'center',
                            }}
                            style={{
                                height: 300,
                            }}
                        >
                            <AppstoreAddOutlined
                                className="p-4 rounded-2xl  bg-purple-200 border-solid border-4 border-transparent transition-all duration-150
                            ease-linear text-black group-hover:border-4 group-hover:border-purple-500"
                                style={{ fontSize: 40 }}
                            />
                            <Typography.Title level={4}>Book Appointments</Typography.Title>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <Link to="/appointments">
                        <Card
                            className="group hover:shadow-xl hover:shadow-primary/30 transition-all duration-150 ease-linear"
                            hoverable
                            bodyStyle={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 16,
                                textAlign: 'center',
                            }}
                            style={{
                                height: 300,
                            }}
                        >
                            <UnorderedListOutlined
                                className="p-4 rounded-2xl  bg-purple-200 border-solid border-4 border-transparent transition-all duration-150
                            ease-linear text-black group-hover:border-4 group-hover:border-purple-500"
                                style={{ fontSize: 40 }}
                            />
                            <Typography.Title level={4}>Appointments</Typography.Title>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
}

export default Home;
