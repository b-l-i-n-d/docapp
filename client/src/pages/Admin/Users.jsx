import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    LockOutlined,
    SyncOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Dropdown, Input, Space, Table, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { useGetAllUsersQuery } from '../../redux/api/userAPI';

function Users() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInfo, setFilteredInfo] = useState({});
    const { data: users, isLoading } = useGetAllUsersQuery();
    const menuItems = [
        {
            key: '1',
            label: 'Edit',
            icon: <EditOutlined />,
        },
        {
            key: '2',
            label: 'Delete',
            icon: <DeleteOutlined />,
        },
    ];
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            fixed: 'left',
            render: (id) => (
                <Typography.Text code ellipsis copyable>
                    {id}
                </Typography.Text>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                switch (role) {
                    case 'admin':
                        return (
                            <Tag icon={<LockOutlined />} color="volcano">
                                {role.toUpperCase()}
                            </Tag>
                        );
                    default:
                        return (
                            <Tag icon={<UserOutlined />} color="cyan">
                                {role.toUpperCase()}
                            </Tag>
                        );
                }
            },
            filteredValue: filteredInfo.role || null,
            filters: [
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'User',
                    value: 'user',
                },
            ],
            onFilter: (value, record) => record.role === value,
            filterSearch: true,
        },
        {
            title: 'Is Doctor',
            dataIndex: 'isDoctor',
            key: 'isDoctor',
            render: (isDoctor) => {
                switch (isDoctor) {
                    case 'pending':
                        return (
                            <Tag icon={<SyncOutlined spin />} color="processing">
                                {isDoctor.toUpperCase()}
                            </Tag>
                        );
                    case 'no':
                        return (
                            <Tag icon={<CheckCircleOutlined />} color="error">
                                {isDoctor.toUpperCase()}
                            </Tag>
                        );
                    default:
                        return (
                            <Tag icon={<CloseCircleOutlined />} color="success">
                                YES
                            </Tag>
                        );
                }
            },
            filteredValue: filteredInfo.isDoctor || null,
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
            onFilter: (value, record) => record.isDoctor === value,
            filterSearch: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            render: () => (
                <Space size="middle">
                    <Dropdown
                        menu={{
                            items: menuItems,
                        }}
                    >
                        <Button>
                            Actions <DownOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            ),
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

    const dataSource = users
        ?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user) => ({
            ...user,
            key: user._id,
        }));
    return (
        <Card
            title="Users"
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
                loading={isLoading}
                bordered
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 800 }}
                onChange={handleChange}
            />
        </Card>
    );
}

export default Users;
