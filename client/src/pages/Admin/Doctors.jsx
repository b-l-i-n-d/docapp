import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Divider,
    Dropdown,
    Input,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useGetAllDoctorsQuery, useUpdateStatusMutation } from '../../redux/api/doctorAPI';
import { useGetDepartmentsQuery } from '../../redux/api/departmentAPI';

function Doctors() {
    const { data: doctors, isLoading: isGetAllDoctorsLoading } = useGetAllDoctorsQuery();
    const [updateDoctorStatus, { isLoading: isUpdateStatusLoading, data: updatedDoctor }] =
        useUpdateStatusMutation();
    const { data: departments } = useGetDepartmentsQuery();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInfo, setFilteredInfo] = useState({});

    const actionDropdownOnclick = (doctorId, doctorStatus) => {
        updateDoctorStatus({
            id: doctorId,
            status: doctorStatus,
        });
    };

    useEffect(() => {
        if (updatedDoctor) {
            console.log('updatedDoctor', updatedDoctor);
        }
    }, [isUpdateStatusLoading, updatedDoctor, doctors, searchQuery]);

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
            filteredValue: filteredInfo.title || null,
            filters: [
                {
                    text: 'Dr.',
                    value: 'Dr.',
                },
                {
                    text: 'Prof. Dr.',
                    value: 'Prof. Dr.',
                },
                {
                    text: 'Assoc. Prof. Dr.',
                    value: 'Assoc. Prof. Dr.',
                },
                {
                    text: 'Asst. Prof. Dr.',
                    value: 'Asst. Prof. Dr.',
                },
            ],
            onFilter: (value, record) => record.title === value,
            filterSearch: true,
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
                <Tooltip placement="topLeft" title={department.name}>
                    {department.name}
                </Tooltip>
            ),
            filteredValue: filteredInfo.department || null,
            filters: departments?.map((department) => ({
                text: department.name,
                value: department.name,
            })),
            onFilter: (value, record) => record.department === value,
            filterSearch: true,
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
                            title={chamber?.days?.map((day) => (
                                <div key={day._id}>
                                    <span>{day.day}</span>
                                    <Divider type="vertical" />
                                    <span>
                                        {dayjs(day.time[0]).format('hh:mm:a')} -{' '}
                                        {dayjs(day.time[1]).format('hh:mm:a')}
                                    </span>
                                </div>
                            ))}
                        >
                            {chamber?.days.map((day) => (
                                <div key={day._id}>
                                    <span>{day.day}</span>
                                    <Divider type="vertical" />
                                    <span>
                                        {dayjs(day.time[0]).format('hh:mm:a')} -{' '}
                                        {dayjs(day.time[1]).format('hh:mm:a')}
                                    </span>
                                </div>
                            ))}
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
            filteredValue: filteredInfo.status || null,
            filters: [
                {
                    text: 'Pending',
                    value: 'pending',
                },
                {
                    text: 'Approved',
                    value: 'approved',
                },
                {
                    text: 'Rejected',
                    value: 'rejected',
                },
            ],
            onFilter: (value, record) => record.status === value,
            filterSearch: true,
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (status, record) => {
                switch (status) {
                    case 'approved':
                        return (
                            <Space size="middle">
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: '2',
                                                label: 'Reject',
                                                icon: <CloseCircleOutlined />,
                                                onClick: () =>
                                                    actionDropdownOnclick(record._id, 'rejected'),
                                            },
                                        ],
                                    }}
                                >
                                    <Button>
                                        Actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Space>
                        );
                    case 'rejected':
                        return (
                            <Space size="middle">
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: '1',
                                                label: 'Approve',
                                                icon: <CheckCircleOutlined />,
                                                onClick: () =>
                                                    actionDropdownOnclick(record._id, 'approved'),
                                            },
                                        ],
                                    }}
                                >
                                    <Button>
                                        Actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Space>
                        );
                    default:
                        return (
                            <Space size="middle">
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: '1',
                                                label: 'Approve',
                                                icon: <CheckCircleOutlined />,
                                                onClick: () =>
                                                    actionDropdownOnclick(record._id, 'approved'),
                                            },
                                            {
                                                key: '2',
                                                label: 'Reject',
                                                icon: <CloseCircleOutlined />,
                                                onClick: () =>
                                                    actionDropdownOnclick(record._id, 'rejected'),
                                            },
                                        ],
                                    }}
                                >
                                    <Button>
                                        Actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Space>
                        );
                }
            },
        },
    ];

    const { Search } = Input;

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const handleChange = (pagination, filters) => {
        setFilteredInfo(filters);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const dataSource = doctors
        ?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user) => ({
            ...user,
            key: user._id,
        }));

    return (
        <Card
            title="Doctors"
            extra={
                <Space>
                    <Search
                        onSearch={handleSearch}
                        allowClear
                        enterButton
                        placeholder="Search by name"
                    />
                    <Button icon={<DeleteOutlined />} onClick={clearFilters}>
                        Clear filters
                    </Button>
                </Space>
            }
        >
            <Table
                loading={isGetAllDoctorsLoading}
                bordered
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => record._id}
                scroll={{
                    x: 2200,
                    y: 300,
                }}
                onChange={handleChange}
            />
        </Card>
    );
}

export default Doctors;
