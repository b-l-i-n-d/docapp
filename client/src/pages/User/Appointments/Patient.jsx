import { Button, Calendar, Card, Col, Row, Space, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getFutureDate } from '../../../helpers';
import { useGetDoctorAppointmentsQuery } from '../../../redux/api/appointmentAPI';
import { useGetDoctorByIdQuery } from '../../../redux/api/doctorAPI';

dayjs.extend(relativeTime);

function Patient() {
    const user = useSelector((state) => state.userState.user);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctor } = useGetDoctorByIdQuery(user?.isDoctor, {
        skip: user?.isDoctor === 'no' || user?.isDoctor === 'pending',
    });
    const getChamberDays = (days) =>
        days?.map((day) => {
            switch (day.day) {
                case 'Sunday':
                    return getFutureDate(0);
                case 'Monday':
                    return getFutureDate(1);
                case 'Tuesday':
                    return getFutureDate(2);
                case 'Wednesday':
                    return getFutureDate(3);
                case 'Thursday':
                    return getFutureDate(4);
                case 'Friday':
                    return getFutureDate(5);
                case 'Saturday':
                    return getFutureDate(6);
                default:
                    return getFutureDate(0);
            }
        });

    const chamberDays = getChamberDays(doctor?.chamber?.days);
    const [date, setDate] = useState(undefined);
    const { data: doctorAppointmentsData, isLoading: isDoctorAppointmentsLoading } =
        useGetDoctorAppointmentsQuery(
            {
                id: user?.isDoctor,
                date: date === dayjs().format('YYYY-MM-DD') ? undefined : date,
                page: currentPage,
            },
            {
                skip: user?.isDoctor === 'no' || user?.isDoctor === 'pending',
            }
        );
    const { data: recentAppointmentsData, isLoading: isRecentAppointmentsLoading } =
        useGetDoctorAppointmentsQuery({
            id: user?.isDoctor,
            recent: 'true',
        });
    const { data: totalAppointments, isLoading: isTotalAppointmetsLoading } =
        useGetDoctorAppointmentsQuery(
            {
                id: user?.isDoctor,
                date,
                count: 'true',
            },
            {
                refetchOnMountOrArgChange: true,
            }
        );
    const { data: doctorAppointments, total: doctorsTotal } = doctorAppointmentsData || {};

    const dateCellRender = (value) => {
        if (date === value.format('YYYY-MM-DD')) {
            return (
                <Tag color="purple-inverse">{!isTotalAppointmetsLoading && totalAppointments}</Tag>
            );
        }
        return null;
    };

    const calanderHeader = () => (
        <Space className="w-full justify-between">
            <Typography.Title underline level={5}>
                Select date to see appointments
            </Typography.Title>

            <Button type="primary" onClick={() => setDate(dayjs().format('YYYY-MM-DD'))}>
                Today
            </Button>
        </Space>
    );

    return (
        <Card title="Patient Appointments" loading={isDoctorAppointmentsLoading}>
            <Row gutter={16}>
                <Col span={14}>
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
                                render: (d) => {
                                    if (dayjs().isAfter(dayjs(d))) {
                                        return (
                                            <Tag color="red">
                                                {dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                            </Tag>
                                        );
                                    }
                                    return (
                                        <Tag color="green">
                                            {dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}
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
                </Col>
                <Col span={10}>
                    <Space direction="vertical" size="large">
                        <Table
                            caption="Recent Appointments"
                            loading={isRecentAppointmentsLoading}
                            dataSource={recentAppointmentsData}
                            pagination={false}
                            columns={[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Date',
                                    dataIndex: 'date',
                                    key: 'date',
                                    render: (d) => {
                                        if (dayjs().isAfter(dayjs(d))) {
                                            return (
                                                <Tag color="red">
                                                    {dayjs(d)
                                                        .format('ddd, DD-MMM-YYYY')
                                                        .toUpperCase()}
                                                </Tag>
                                            );
                                        }
                                        return (
                                            <Tag color="green">
                                                {dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}
                                            </Tag>
                                        );
                                    },
                                },
                                {
                                    title: 'Created At',
                                    dataIndex: 'createdAt',
                                    key: 'createdAt',
                                    render: (d) =>
                                        // from now

                                        dayjs(d).fromNow(),
                                },
                            ]}
                        />
                        <Calendar
                            fullscreen={false}
                            value={dayjs(date)}
                            headerRender={calanderHeader}
                            disabledDate={(current) =>
                                !chamberDays?.includes(dayjs(current).format('YYYY-MM-DD'))
                            }
                            dateCellRender={dateCellRender}
                            onSelect={(value) => setDate(dayjs(value).format('YYYY-MM-DD'))}
                        />
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}

export default Patient;
