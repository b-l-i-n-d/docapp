/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Form, Input, notification, Spin } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { themeChange } from 'theme-change';
import LogoImg from '../assets/login/1.png';
import ThemeSwitch from '../components/common/themes/ThemeSwitch';
import { useSignupUserMutation } from '../redux/api/authAPI';

function Signup() {
    useEffect(() => {
        themeChange(false);
    }, []);

    const theme = localStorage.getItem('theme');
    const [signupUser, { isLoading, isSuccess, data, error }] = useSignupUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
        if (error) {
            notification.error({
                message: error?.data ? error?.data.error : 'Can not connect to server.',
                description: error?.data ? error?.data.description : 'Please try again.',
            });
        }
    }, [data, error, isLoading, isSuccess, navigate]);

    const onFinish = (values) => {
        signupUser(values);
    };

    return (
        <Spin spinning={isLoading} size="large" style={{ maxHeight: '100vh' }}>
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="text-center flex flex-col items-center lg:text-left lg:ml-5 lg:w-1/2">
                        <img
                            className="w-20 h-20 lg:w-auto lg:h-auto"
                            src={LogoImg}
                            alt="DOCAPP Logo"
                        />
                        <h2 className="lg:text-5xl font-bold m-0 lg:mb-2 text-base-content border-b-4 border-primary rounded-md pb-2">
                            DOCAPP
                        </h2>
                        <h2 className="lg:py-3 m-0 lg:mb-2 text-lg lg:text-3xl text-base-content font-medium">
                            Connects you with your doctor.
                        </h2>
                        <p className="lg:text-lg text-base-content">Add your appionment now</p>
                    </div>
                    <div className="card lg:w-1/2 w-full max-w-md shadow-primary/30 shadow-2xl bg-base-100 text-base-content">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="font-bold text-xl text-base-content border-b-4 border-primary rounded-md pb-1">
                                    Signup
                                </h2>
                                <ThemeSwitch theme={theme} />
                            </div>
                            <Form layout="vertical" onFinish={onFinish}>
                                <Form.Item
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
                                    label={<label className="text-base-content">Email</label>}
                                    className="form-control"
                                >
                                    <Form.Item
                                        name="email"
                                        noStyle
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
                                </Form.Item>
                                <Form.Item
                                    label={<label className="text-base-content">Password</label>}
                                    className="form-control text-base-100"
                                >
                                    <Form.Item
                                        name="password"
                                        noStyle
                                        rules={[
                                            {
                                                min: 6,
                                                message: 'Must be at least 6 chars long',
                                            },
                                            {
                                                pattern:
                                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                                                message:
                                                    'Password should be combination of one uppercase, one lower case, one special char.',
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
                                </Form.Item>
                                <Form.Item className="form-control">
                                    <Button
                                        className="btn w-full btn-primary hover:text-base-100 focus:btn-primary ring-primary focus:ring-1 ring-offset-2 mt-2"
                                        htmlType="submit"
                                    >
                                        Signup
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p>
                                Alread have an account.{' '}
                                <Link to="/login" className="link link-primary font-bold">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default Signup;
