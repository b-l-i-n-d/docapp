import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Calendar, Col, Form, Input, Modal, notification, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useAddAppointmentMutation,
    useGetAppointmentsCountByIdAndDateQuery,
} from '../../redux/api/appointmentAPI';

function AppointmentModal({ button, chamberDays }) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(chamberDays[0]);
    const { doctorId } = useParams();
    const { data: count, isLoading } = useGetAppointmentsCountByIdAndDateQuery(
        {
            id: doctorId,
            date,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [
        addAppointment,
        { data: appointment, isLoading: isAddAppointmentLoading, error: addAppointmentError },
    ] = useAddAppointmentMutation();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            ...values,
            date,
        };
        addAppointment({ doctorId, ...data });
        form.resetFields();
    };

    useEffect(() => {
        if (appointment && !isAddAppointmentLoading) {
            notification.success({
                message: 'Appointment Booked Successfully',
            });
        }
        if (addAppointmentError) {
            notification.error({
                message: 'Appointment Booking Failed',
                description: addAppointmentError.message,
            });
        }
        if (!isAddAppointmentLoading) {
            setOpen(false);
        }
    }, [appointment, addAppointmentError, isAddAppointmentLoading]);

    return (
        <>
            <Button
                icon={<PlusCircleOutlined />}
                size="large"
                type="primary"
                onClick={() => setOpen(true)}
            >
                {button}
            </Button>
            <Modal
                title="Book Appointment"
                centered
                open={open}
                okText="Book"
                confirmLoading={isAddAppointmentLoading}
                onOk={() => form.submit()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Row gutter={32}>
                    <Col span={12}>
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Name is required' }]}
                            >
                                <Input placeholder="Patient Name" />
                            </Form.Item>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Type"
                                        name="type"
                                        rules={[{ required: true, message: 'Type is required' }]}
                                    >
                                        <Select placeholder="Select type">
                                            <Select.Option value="New">New</Select.Option>
                                            <Select.Option value="Follow Up">
                                                FollowUp
                                            </Select.Option>
                                            <Select.Option value="Report">Report</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Gender"
                                        name="gender"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Gender is required',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select gender">
                                            <Select.Option value="Male">Male</Select.Option>
                                            <Select.Option value="Female">Female</Select.Option>
                                            <Select.Option value="Other">Other</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Age is required',
                                            },
                                            {
                                                pattern: /^[0-9]*$/,
                                                message: 'Use valid age',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Patient Age" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Phone is required' },
                                            {
                                                pattern: /^(?:\+88)?(01[3-9])\d{8}$/,
                                                message: 'Use valid phone number',
                                            },
                                        ]}
                                        tooltip="Will be used for sending SMS"
                                    >
                                        <Input
                                            style={{
                                                width: '100%',
                                            }}
                                            className="w-full"
                                            placeholder="Phone"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Space direction="vertical" size="large">
                            <h4>
                                Currently selected: <span className="text-primary">{date}</span> |
                                Current serial: {!isLoading && count}
                            </h4>
                            <Calendar
                                fullscreen={false}
                                headerRender={() => {}}
                                value={dayjs(date)}
                                disabledDate={(current) =>
                                    !chamberDays?.includes(dayjs(current).format('YYYY-MM-DD'))
                                }
                                onSelect={(value) => setDate(dayjs(value).format('YYYY-MM-DD'))}
                            />
                        </Space>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default AppointmentModal;
