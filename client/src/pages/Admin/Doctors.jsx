import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Table, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useGetAllDoctorsQuery } from '../../redux/api/doctorAPI';

function Doctors() {
    const { data } = useGetAllDoctorsQuery();
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            fixed: 'left',
            render: (id) => (
                <Tooltip placement="topLeft" title={id}>
                    <Typography.Text code ellipsis copyable>
                        {id}
                    </Typography.Text>
                </Tooltip>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            fixed: 'left',
            ellipsis: {
                showTitle: false,
            },
            render: (email) => (
                <Tooltip placement="topLeft" title={email}>
                    {email}
                </Tooltip>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Avatar src={image} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: {
                showTitle: false,
            },
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Natioanl ID',
            dataIndex: 'nationalId',
            key: 'nationalId',
            ellipsis: {
                showTitle: false,
            },
            render: (nationalId) => (
                <Tooltip placement="topLeft" title={nationalId}>
                    {nationalId}
                </Tooltip>
            ),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            ellipsis: {
                showTitle: false,
            },
            render: (dateOfBirth) => (
                <Tooltip placement="topLeft" title={dateOfBirth}>
                    {dayjs(dateOfBirth).format('DD-MMM-YYYY')}
                </Tooltip>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: {
                showTitle: false,
            },
            render: (title) => (
                <Tooltip placement="topLeft" title={title}>
                    {title}
                </Tooltip>
            ),
        },
        {
            title: 'Present Address',
            dataIndex: 'presentAddress',
            key: 'presentAddress',
            ellipsis: {
                showTitle: false,
            },
            render: (presentAddress) => (
                <Tooltip placement="topLeft" title={presentAddress}>
                    {presentAddress}
                </Tooltip>
            ),
        },
        {
            title: 'Doctor Type',
            dataIndex: 'doctorType',
            key: 'doctorType',
            ellipsis: {
                showTitle: false,
            },
            render: (doctorType) => (
                <Tooltip placement="topLeft" title={doctorType}>
                    {doctorType}
                </Tooltip>
            ),
        },
        {
            title: 'BMDC Regidtration No',
            dataIndex: 'bmdcRegNo',
            key: 'bmdcRegNo',
            ellipsis: {
                showTitle: false,
            },
            render: (bmdcRegNo) => (
                <Tooltip placement="topLeft" title={bmdcRegNo}>
                    {bmdcRegNo}
                </Tooltip>
            ),
        },
        {
            title: 'Departmnet',
            dataIndex: 'department',
            key: 'department',
            ellipsis: {
                showTitle: false,
            },
            render: (department) => (
                <Tooltip placement="topLeft" title={department}>
                    {department}
                </Tooltip>
            ),
        },
        {
            title: 'Specialized in',
            dataIndex: 'specialized',
            key: 'specialized',
            ellipsis: {
                showTitle: false,
            },
            render: (specialized) => (
                <Tooltip placement="topLeft" title={specialized}>
                    {specialized}
                </Tooltip>
            ),
        },
        {
            title: 'Current Workplace',
            dataIndex: 'workplace',
            key: 'workplace',
            ellipsis: {
                showTitle: false,
            },
            render: (workplace) => (
                <Tooltip placement="topLeft" title={workplace}>
                    {workplace}
                </Tooltip>
            ),
        },
        {
            title: 'Chamber',
            children: [
                {
                    title: 'Location',
                    dataIndex: 'chamber',
                    key: 'location',
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (chamber) => (
                        <Tooltip placement="topLeft" title={chamber?.location}>
                            {chamber?.location}
                        </Tooltip>
                    ),
                },
                {
                    title: 'Fees',
                    dataIndex: 'chamber',
                    key: 'fees',
                    render: (chamber) => chamber?.fees,
                },
                {
                    title: 'Days',
                    dataIndex: 'chamber',
                    key: 'days',
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (chamber) => (
                        <Tooltip
                            placement="topLeft"
                            title={chamber?.activeDay.map((day) => (
                                <span>{day}, </span>
                            ))}
                        >
                            {chamber?.activeDay.map((day) => (
                                <Typography.Text>{day}, </Typography.Text>
                            ))}
                        </Tooltip>
                    ),
                },
                {
                    title: 'Time',
                    dataIndex: 'chamber',
                    key: 'time',
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (chamber) => (
                        <Tooltip
                            placement="topLeft"
                            title={`Start time: ${dayjs(chamber?.time[0]).format(
                                'hh:mm:a'
                            )} - End time: ${dayjs(chamber?.time[1]).format('hh:mm:a')}`}
                        >
                            {`Start time: ${dayjs(chamber?.time[0]).format(
                                'hh:mm:a'
                            )} - End time: ${dayjs(chamber?.time[1]).format('hh:mm:a')}`}
                        </Tooltip>
                    ),
                },
            ],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 110,
            render: (status) => {
                switch (status) {
                    case 'pending':
                        return (
                            <Tag icon={<SyncOutlined spin />} color="processing">
                                {status.toUpperCase()}
                            </Tag>
                        );
                    case 'approved':
                        return (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                {status.toUpperCase()}
                            </Tag>
                        );
                    default:
                        return (
                            <Tag icon={<CloseCircleOutlined />} color="error">
                                {status.toUpperCase()}
                            </Tag>
                        );
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'status',
            fixed: 'right',
            width: 110,
            render: (status) => status === 'pending' && <Button>Approve</Button>,
        },
    ];
    const dataSource = data?.map((doctor) => ({
        key: doctor._id,
        ...doctor,
    }));

    return (
        <Card title="Doctors">
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                scroll={{
                    x: 2000,
                    y: 300,
                }}
            />
        </Card>
    );
}

export default Doctors;
