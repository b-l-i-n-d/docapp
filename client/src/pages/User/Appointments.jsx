import { Card, Table, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useGetDoctorAppointmentsQuery,
    useGetUserAppointmentsQuery,
} from '../../redux/api/appointmentAPI';

function Appointments() {
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector((state) => state.userState.user);
    const { data: appointmentsData, isLoading } = useGetUserAppointmentsQuery(currentPage);
    const { data: doctorAppointmentsData, isLoading: isDoctorAppointmentsLoading } =
        useGetDoctorAppointmentsQuery(
            {
                id: user?.isDoctor,
                page: currentPage,
            },
            {
                skip: user?.isDoctor === 'pending' || user?.isDoctor === 'no',
            }
        );

    const { data: appointments, total } = appointmentsData || {};
    const { data: doctorAppointments, total: doctorsTotal } = doctorAppointmentsData || {};

    const tabItems = [
        {
            key: '1',
            label: 'Personal Appointments',
            children: (
                <Table
                    loading={isLoading}
                    dataSource={appointments}
                    pagination={{
                        current: currentPage,
                        total,
                        pageSize: import.meta.env.VITE_PAGE_SIZE,
                        onChange: (page) => setCurrentPage(page),
                        showTotal: (totalData) => `Total ${totalData} appointments`,
                    }}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                            key: 'phone',
                        },
                        {
                            title: 'Age',
                            dataIndex: 'age',
                            key: 'age',
                        },
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            render: (date) => {
                                if (dayjs().isAfter(dayjs(date))) {
                                    return (
                                        <Tag color="red">
                                            {dayjs(date).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag color="green">
                                        {dayjs(date).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                    </Tag>
                                );
                            },
                        },
                        {
                            title: 'Doctor',
                            dataIndex: 'doctorId',
                            key: 'doctorId._id',
                            render: (doctor) => doctor.name,
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            render: (type) => {
                                if (type === 'New') {
                                    return <Tag color="green">{type.toUpperCase()}</Tag>;
                                }
                                if (type === 'Follow Up') {
                                    return <Tag color="blue">{type.toUpperCase()}</Tag>;
                                }
                                return <Tag color="orange">{type.toUpperCase()}</Tag>;
                            },
                        },
                    ]}
                />
            ),
        },
        {
            key: '2',
            label: 'Doctor Appointments',
            children: (
                <Table
                    loading={isDoctorAppointmentsLoading}
                    dataSource={doctorAppointments}
                    pagination={{
                        current: currentPage,
                        doctorsTotal,
                        pageSize: import.meta.env.VITE_PAGE_SIZE,
                        onChange: (page) => setCurrentPage(page),
                        showTotal: (totalData) => `Total ${totalData} appointments`,
                    }}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                            key: 'phone',
                        },
                        {
                            title: 'Age',
                            dataIndex: 'age',
                            key: 'age',
                        },
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            render: (date) => {
                                if (dayjs().isAfter(dayjs(date))) {
                                    return (
                                        <Tag color="red">
                                            {dayjs(date).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag color="green">
                                        {dayjs(date).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                    </Tag>
                                );
                            },
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            render: (type) => {
                                if (type === 'New') {
                                    return <Tag color="green">{type.toUpperCase()}</Tag>;
                                }
                                if (type === 'Follow Up') {
                                    return <Tag color="blue">{type.toUpperCase()}</Tag>;
                                }
                                return <Tag color="orange">{type.toUpperCase()}</Tag>;
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <Card title="Appointments" loading={isLoading}>
            {user.isDoctor !== 'pending' || user.isDoctor !== 'no' ? (
                <Tabs defaultActiveKey="1" type="card" items={tabItems} size="large" />
            ) : (
                <Table
                    loading={isLoading}
                    dataSource={appointments}
                    pagination={{
                        current: currentPage,
                        total,
                        pageSize: import.meta.env.VITE_PAGE_SIZE,
                        onChange: (page) => setCurrentPage(page),
                        showTotal: (totalData) => `Total ${totalData} appointments`,
                    }}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                            key: 'phone',
                        },
                        {
                            title: 'Age',
                            dataIndex: 'age',
                            key: 'age',
                        },
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            render: (date) => {
                                if (dayjs().isAfter(dayjs(date))) {
                                    return (
                                        <Tag color="red">
                                            {dayjs(date).format('ddd, DD-MM-YYYY').toUpperCase()}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag color="green">
                                        {dayjs(date).format('ddd, DD-MM-YYYY').toUpperCase()}
                                    </Tag>
                                );
                            },
                        },
                        {
                            title: 'Doctor',
                            dataIndex: 'doctorId',
                            key: 'doctorId._id',
                            render: (doctor) => doctor.name,
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            render: (type) => {
                                if (type === 'New') {
                                    return <Tag color="green">{type.toUpperCase()}</Tag>;
                                }
                                if (type === 'Follow Up') {
                                    return <Tag color="blue">{type.toUpperCase()}</Tag>;
                                }
                                return <Tag color="orange">{type.toUpperCase()}</Tag>;
                            },
                        },
                    ]}
                />
            )}
        </Card>
    );
}

export default Appointments;
