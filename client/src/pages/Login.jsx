/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { themeChange } from 'theme-change';
import LogoImg from '../assets/login/1.png';
import { useLoginUserMutation } from '../redux/api/authAPI';

function Login() {
    useEffect(() => {
        themeChange(false);
    }, []);

    const theme = localStorage.getItem('theme');
    const [loginUser, { isError, isLoading, isSuccess, data, error }] = useLoginUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
        if (isError) {
            notification.open({
                type: 'error',
                message: error.data.error,
                description: error.data.description,
                placement: 'bottomRight',
            });
        }
    }, [data, error, isError, isLoading, isSuccess, navigate]);

    const onFinish = (values) => {
        loginUser(values);
    };

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse w-full">
                <div className="text-center flex flex-col items-center lg:text-left lg:ml-5 lg:w-1/2">
                    <img
                        className="w-20 h-20 lg:w-auto lg:h-auto"
                        src={LogoImg}
                        alt="DOCAPP Logo"
                    />
                    <h2 className="lg:text-5xl font-bold m-0 lg:mb-2 text-base-content rounded-md pb-2 border-b-4 border-primary">
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
                            <h2 className="font-bold text-xl text-base-content rounded-md pb-1 border-b-4 border-primary">
                                Login
                            </h2>
                            <label className="swap swap-rotate text-base-content">
                                <input type="checkbox" />

                                <svg
                                    data-set-theme="night"
                                    className={`${
                                        theme === 'light' ? 'swap-on' : 'swap-off'
                                    } fill-current w-6 h-w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                <svg
                                    data-set-theme="light"
                                    className={`${
                                        theme === 'light' ? 'swap-off' : 'swap-on'
                                    } fill-current w-6 h-w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </div>
                        <Form layout="vertical" onFinish={onFinish}>
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
                                            required: true,
                                            message: 'Password is required',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="input input-bordered text-base-content antdInputPassword"
                                        placeholder="min 6 chars long"
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item className="form-control">
                                <Button
                                    className="btn w-full btn-primary hover:text-base-100 focus:btn-primary ring-primary focus:ring-1 ring-offset-2 mt-4"
                                    htmlType="submit"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <p>
                            Dont&apos;t have any account.{' '}
                            <Link to="/signup" className="link link-primary font-bold">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
