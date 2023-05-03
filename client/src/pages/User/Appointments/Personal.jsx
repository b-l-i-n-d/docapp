import { Card, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useGetUserAppointmentsQuery } from '../../../redux/api/appointmentAPI';

function Personal() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: appointmentsData, isLoading } = useGetUserAppointmentsQuery({
        page: currentPage,
    });

    const { data: appointments, total } = appointmentsData || {};

    return (
        <Card title="Personal Appointments" loading={isLoading}>
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
        </Card>
    );
}

export default Personal;
