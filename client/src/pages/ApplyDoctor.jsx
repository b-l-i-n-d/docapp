/* eslint-disable jsx-a11y/label-has-associated-control */
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    notification,
    Row,
    Select,
    TimePicker,
    Upload
} from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import Departmnet from '../assets/data/departmentData.json';
import Districts from '../assets/data/districtsData.json';
import Hospitals from '../assets/data/hospitalData.json';
import { getBase64 } from '../helpers';
import { useAddDoctorMutation } from '../redux/api/doctorAPI';

const { Option } = Select;

function ApplyDoctor() {
    const user = useSelector((store) => store.userState.user);
    const [form] = Form.useForm();
    const doctorType = Form.useWatch('doctorType', form);
    const [addDoctor, { isLoading, data, error }] = useAddDoctorMutation();
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
    };

    useEffect(() => {
        form.setFieldsValue({ email: user.email });
    }, [form, user.email]);

    useEffect(() => {
        if (error) {
            notification.open({
                className:
                    'bg-base-100 rounded-2xl text-base-content antdNotificationMessage antdNotificationClose shadow-lg shadow-primary/30',
                type: 'error',
                message: error.data ? error.data.error : 'Can not connect to server.',
                description: error.data ? error.data.description : 'Please try again.',
                placement: 'bottomRight',
            });
        }
        if (data) {
            notification.open({
                className:
                    'bg-base-100 rounded-2xl text-base-content antdNotificationMessage antdNotificationClose shadow-lg shadow-primary/30',
                type: 'success',
                message: "Suucessfully applied for doctor's account.",
                placement: 'bottomRight',
            });
        }
    }, [data, isLoading, error]);

    const onFinish = (values) => {
        const formData = values;
        formData.image = imageUrl;
        console.log(formData);
        addDoctor(formData);
    };

    const districtElements = Districts.map((district) => (
        <Option key={district.id} value={district.name}>
            {district.name}
        </Option>
    ));

    const departmentElements = Departmnet.map((department) => (
        <Option key={department.id} value={department.name}>
            {department.name}
        </Option>
    ));

    const hospitalElements = Hospitals.map((hospital) => (
        <Option key={Math.random()} value={hospital.orgName}>
            {hospital.orgName}
        </Option>
    ));

    return (
        <Card title="Doctor registration" className="bg-base-100">
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <div>
                    <h1 className="font-bold">Personal Information</h1>
                    <Divider />

                    <Row gutter={16}>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="name"
                                label={<label className="text-base-content">Name</label>}
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
                                    // className="input input-bordered text-base-content"
                                    placeholder="ex: John Wick"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
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
                                    disabled
                                    // className="input input-bordered text-base-content"
                                    placeholder="ex: mail@example.com"
                                    value={user.email}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="nationalId"
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
                                        pattern: /^(\d{10}|\d{13}|\d{17})$/,
                                        message: 'Plase use 10, 13 or 17 digit NID no.',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Plaease enter your national ID"
                                    min={10}
                                    max={17}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
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
                                <Select placeholder="Select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="dateOfBirth"
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
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                label={<label>Image</label>}
                                name="image"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) {
                                        return e;
                                    }
                                    return e?.fileList;
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload your image',
                                    },
                                ]}
                            >
                                <Upload
                                    accept="image/png, image/jpeg, image/jpg"
                                    maxCount={1}
                                    name="files"
                                    showUploadList={false}
                                    listType="picture-card"
                                    onChange={handleChange}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        <div>
                                            <AiOutlinePlus />
                                            <div className="mt-2">Upload</div>
                                        </div>
                                    )}
                                </Upload>
                                {/* <Input type="file" /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h1 className="font-bold">Professional Information</h1>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={24} md={12}>
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
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                name="presentAddress"
                                label={<label className="text-base-content">Present address</label>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select district!',
                                    },
                                ]}
                            >
                                <Select showSearch placeholder="Select district">
                                    {districtElements}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
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
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="bmdcRegNo"
                                label={
                                    <label className="text-base-content">
                                        Registration No. (BMDC)
                                    </label>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your BMDC registration No.',
                                    },
                                    {
                                        pattern:
                                            doctorType === 'Medical'
                                                ? /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|10[0-8][0-9]{3}|109[0-4][0-9]{2}|109500)$/
                                                : /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|10[0-9]{3}|11[0-2][0-9]{2}|113[0-4][0-9]|11350)$/,
                                        message: 'Plase use valid BMDC registration no.',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your BMDC reg. no." />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="department"
                                label={<label>Department</label>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select department.',
                                    },
                                ]}
                            >
                                <Select showSearch placeholder="Select your department">
                                    {departmentElements}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="specialized"
                                label={<label>Specialized in</label>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please type your degree and specialization!',
                                    },
                                ]}
                            >
                                <Input placeholder="Please type your degree and specialization!" />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item
                                required
                                name="workplace"
                                label={<label>Current Workplace</label>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please type your current workplace',
                                    },
                                ]}
                            >
                                <Select showSearch placeholder="Select your work place.">
                                    {hospitalElements}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Card title="Chamber Information">
                        <Row gutter={16}>
                            <Col span={24} md={12}>
                                <Form.Item
                                    required
                                    label={<label className="text-base-content">Location</label>}
                                    name={['chamber', 'location']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input loaction',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter chamber location" />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12}>
                                <Form.Item
                                    required
                                    label={<label>Fees</label>}
                                    name={['chamber', 'fees']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input fees',
                                        },
                                        {
                                            pattern: /^\d[0-9]*$/,
                                            message: 'Please use number.',
                                        },
                                    ]}
                                >
                                    <Input
                                        addonBefore={<TbCurrencyTaka />}
                                        placeholder="Enter Amount"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12}>
                                <Form.Item
                                    required
                                    label={<label className="text-base-content">Active day</label>}
                                    name={['chamber', 'activeday']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select active day.',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        placeholder="Please select date"
                                    >
                                        <Option value="Friday">Friday</Option>
                                        <Option value="Saturday">Saturday</Option>
                                        <Option value="Sunday">Sunday</Option>
                                        <Option value="Monday">Monday</Option>
                                        <Option value="Tuesday">Tuesday</Option>
                                        <Option value="Wednesday">Wednesday</Option>
                                        <Option value="Thusday">Thusday</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={12}>
                                <Form.Item
                                    required
                                    label={<label className="text-base-content">Time</label>}
                                    name={['chamber', 'time']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select time.',
                                        },
                                    ]}
                                >
                                    <TimePicker.RangePicker
                                        minuteStep={15}
                                        use12Hours
                                        format="h:mm a"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <Divider />
                <Row>
                    <Col span={24} md={12}>
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
                                // className="input input-bordered text-base-content antdInputPassword antdInputPasswordIcon"
                                placeholder="min 6 chars long"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="form-control">
                    <Button
                        type="primary"
                        // className="btn w-full btn-primary hover:text-base-100 focus:btn-primary ring-primary focus:ring-1 ring-offset-2 mt-4"
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
