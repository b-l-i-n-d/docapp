/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Card, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import React from 'react';
import Districts from '../assets/data/districtsData.json';

const { Option } = Select;

function ApplyDoctor() {
    const onFinish = (values) => {
        console.log(values);
    };

    const districtElements = Districts.map((district) => (
        <Option value={district.name}>{district.name}</Option>
    ));

    return (
        <Card title="Doctor registration" className="bg-base-100">
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label={<label className="text-base-content">Title</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select your title.',
                        },
                    ]}
                >
                    <Select placeholder="Select your title">
                        <Option value="Dr.">Dr.</Option>
                        <Option value="Prof. Dr.">Prof. Dr.</Option>
                        <Option value="Assoc. Prof. Dr.">Assoc. Prof. Dr.</Option>
                        <Option value="Asst. Prof. Dr.">Asst. Prof. Dr.</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    required
                    label={<label className="text-base-content">Name</label>}
                    className="form-control"
                >
                    <Form.Item
                        name="name"
                        noStyle
                        rules={[
                            {
                                min: 2,
                                message: 'Must have at least 2 chars',
                            },
                            {
                                required: true,
                                message: 'Please input name',
                            },
                        ]}
                    >
                        <Input
                            className="input input-bordered text-base-content"
                            placeholder="ex: John Wick"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    required
                    name="date-picker"
                    label={<label className="text-base-content">Date of birth</label>}
                    rules={[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select date of birth!',
                        },
                    ]}
                >
                    <DatePicker placeholder="yyyy-mm-dd" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label={<label className="text-base-content">Gender</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="district"
                    label={<label className="text-base-content">Present address</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select district!',
                        },
                    ]}
                >
                    <Select placeholder="Select district">{districtElements}</Select>
                </Form.Item>
                <Form.Item
                    required
                    name="nid"
                    label={<label className="text-base-content">National ID</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your National ID No.',
                        },
                        {
                            min: 10,
                            message: 'Must be at least 10 digits',
                        },
                        {
                            max: 17,
                            message: 'Can not be more than 17 digits',
                        },
                        {
                            pattern: /^(\d{10}|\d{17})$/,
                            message: 'Plase use 10 or 17 digit NID no.',
                        },
                    ]}
                >
                    <Input min={10} max={17} />
                </Form.Item>
                <Form.Item
                    required
                    name="registrationNo"
                    label={<label className="text-base-content">Registration No. (BMDC)</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your BMDC registration No.',
                        },
                        {
                            pattern:
                                /^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|10[0-8][0-9]{3}|109[0-4][0-9]{2}|109500)$/,
                            message: 'Plase use valid BMDC registration no.',
                        },
                    ]}
                >
                    <Input min={10} max={17} />
                </Form.Item>
                <Form.Item
                    name="doctorType"
                    label={<label className="text-base-content">Doctor Type</label>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select type.',
                        },
                    ]}
                >
                    <Select placeholder="Select type">
                        <Option value="Medical">Medical</Option>
                        <Option value="Dental">Dental</Option>
                    </Select>
                </Form.Item>

                <Card title="Chmaber Information">
                    <Form.Item
                        required
                        label={<label className="text-base-content">Time</label>}
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: 'Please select time.',
                            },
                        ]}
                    >
                        <TimePicker.RangePicker use12Hours format="h:mm a" />
                    </Form.Item>
                    <Form.Item
                        required
                        label={<label className="text-base-content">Active day</label>}
                        name="activeDay"
                        rules={[
                            {
                                required: true,
                                message: 'Please select active day.',
                            },
                        ]}
                    >
                        <Select mode="multiple" allowClear placeholder="Please select date">
                            <Option value="Friday">Friday</Option>
                            <Option value="Saturday">Saturday</Option>
                            <Option value="Sunday">Sunday</Option>
                            <Option value="Monday">Monday</Option>
                            <Option value="Tuesday">Tuesday</Option>
                            <Option value="Wednesday">Wednesday</Option>
                            <Option value="Thusday">Thusday</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        required
                        label={<label className="text-base-content">Location</label>}
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: 'Please input loaction',
                            },
                        ]}
                    >
                        <Input placeholder="Enter chamber location" />
                    </Form.Item>
                </Card>

                <Form.Item
                    label={<label className="text-base-content">Email</label>}
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Enter a valid email',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        className="input input-bordered text-base-content"
                        placeholder="ex: mail@example.com"
                    />
                </Form.Item>

                <Form.Item
                    required
                    label={<label className="text-base-content">Password</label>}
                    className="form-control text-base-100"
                    name="password"
                    rules={[
                        {
                            min: 6,
                            message: 'Must be at least 6 chars long',
                        },
                        {
                            required: true,
                            message: 'Password is required',
                        },
                    ]}
                >
                    <Input.Password
                        className="input input-bordered text-base-content antdInputPassword antdInputPasswordIcon"
                        placeholder="min 6 chars long"
                    />
                </Form.Item>

                <Form.Item className="form-control">
                    <Button
                        className="btn w-full btn-primary hover:text-base-100 focus:btn-primary ring-primary focus:ring-1 ring-offset-2 mt-4"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ApplyDoctor;
