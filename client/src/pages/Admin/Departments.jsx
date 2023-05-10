import { DeleteOutlined, DownOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Form, Input, Modal, Space, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    useAddDepartmentMutation,
    useDeleteDepartmentMutation,
    useEditDepartmentMutation,
    useGetDepartmentsQuery,
} from '../../redux/api/departmentAPI';

function Departments() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Department');
    const [modalOkText, setModalOkText] = useState('Add');
    const [isEditModal, setIsEditModal] = useState(false);
    const [form] = Form.useForm();
    const { data: departments, isLoading, error } = useGetDepartmentsQuery();
    const [
        addDepartment,
        { data: addedDepartment, isLoading: isAddDepartmentLoading, error: addDepartmentError },
    ] = useAddDepartmentMutation();
    const [
        editDepartment,
        { data: editedDepartment, isLoading: isEditDepartmentLoading, error: editDepartmentError },
    ] = useEditDepartmentMutation();
    const [
        deleteDepartment,
        {
            data: deletedDepartment,
            isLoading: isDeleteDepartmentLoading,
            error: deleteDepartmentError,
        },
    ] = useDeleteDepartmentMutation();
    const [searchQuery, setSearchQuery] = useState('');

    const { Search } = Input;

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddModal = () => {
        setIsEditModal(false);
        setModalTitle('Add Department');
        setModalOkText('Add');
        handleModalOpen();
    };

    const handleEditModal = (id, value) => {
        setIsEditModal(id);
        setModalTitle('Edit Department');
        setModalOkText('Edit');
        form.setFieldsValue({
            name: value,
        });
        handleModalOpen();
    };

    const onFinish = (values) => {
        if (isEditModal) {
            editDepartment({ id: isEditModal, data: values });
        } else {
            addDepartment(values);
        }
    };

    const columns = [
        {
            title: 'Department Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Total Doctors',
            dataIndex: 'doctors',
            key: 'doctors',
            sorter: (a, b) => a.doctors.length - b.doctors.length,
            render: (doctors) => doctors.length,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: 'Edit',
                                    icon: <EditOutlined />,
                                    onClick: () => handleEditModal(record._id, record.name),
                                },
                                record.doctors.length === 0 && {
                                    key: '2',
                                    label: 'Delete',
                                    icon: <DeleteOutlined />,
                                    onClick: () => deleteDepartment(record._id),
                                },
                            ],
                        }}
                    >
                        <Button
                            loading={isDeleteDepartmentLoading && record._id === deletedDepartment}
                        >
                            Actions <DownOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const data = departments?.filter((department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (error) {
            notification.error({
                message: 'Department Fetching Failed',
                description: error.data.error,
            });
        }
    }, [error]);

    useEffect(() => {
        if (addedDepartment && !isAddDepartmentLoading) {
            form.resetFields();
            setIsModalOpen(false);
            notification.success({
                message: 'Department Added Successfully',
            });
        }

        if (addDepartmentError) {
            notification.error({
                message: 'Department Adding Failed',
                description: addDepartmentError.data.error,
            });
        }
    }, [addDepartmentError, addedDepartment, form, isAddDepartmentLoading]);

    useEffect(() => {
        if (editedDepartment && !isEditDepartmentLoading) {
            form.resetFields();
            setIsModalOpen(false);
            notification.success({
                message: 'Department Edited Successfully',
            });
        }

        if (editDepartmentError) {
            notification.error({
                message: 'Department Editing Failed',
                description: editDepartmentError.data.error,
            });
        }
    }, [editedDepartment, editDepartmentError, isEditDepartmentLoading, form]);

    useEffect(() => {
        if (deletedDepartment && !isDeleteDepartmentLoading) {
            notification.success({
                message: 'Department Deleted Successfully',
            });
        }

        if (deleteDepartmentError) {
            notification.error({
                message: 'Department Deleting Failed',
                description: deleteDepartmentError.data.error,
            });
        }
    }, [deletedDepartment, deleteDepartmentError, isDeleteDepartmentLoading]);

    return (
        <>
            <Card
                title="Departments"
                extra={
                    <Space>
                        <Search
                            onSearch={handleSearch}
                            allowClear
                            enterButton
                            placeholder="Search Department"
                        />
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            onClick={handleAddModal}
                        >
                            Add Department
                        </Button>
                    </Space>
                }
            >
                <Table
                    bordered
                    loading={isLoading}
                    dataSource={data}
                    rowKey={(record) => record._id}
                    columns={columns}
                />
            </Card>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleModalClose}
                okText={modalOkText}
                onOk={() => form.submit()}
                confirmLoading={isAddDepartmentLoading || isEditDepartmentLoading}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Department Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input department name!',
                            },
                        ]}
                    >
                        <Input placeholder="Department Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Departments;
