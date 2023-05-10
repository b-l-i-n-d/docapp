/* eslint-disable jsx-a11y/label-has-associated-control */
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LogoImg from '../../assets/login/1.png';
import { useResetPasswordMutation } from '../../redux/api/authAPI';

function ResetPassword() {
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.userState.user?._id);
    const [
        resetPassword,
        { data: resetPasswordData, isLoading: resetPasswordLoading, error: resetPasswordError },
    ] = useResetPasswordMutation();

    const onFinish = (values) => {
        if (values.password !== values.confirmPassword) {
            notification.error({
                message: 'Password mismatch',
                description: 'Please check your password and confirm password',
            });
        } else {
            const token = query.get('token');
            const id = query.get('id');
            resetPassword({ ...values, token, userId: id });
        }
    };

    useEffect(() => {
        if (userId !== query.get('id')) {
            navigate(-1);
        }
    }, [userId, query, navigate]);

    useEffect(() => {
        if (resetPasswordLoading) {
            notification.open({
                key: 'resetPassword',
                icon: <LoadingOutlined spin />,
                message: 'Resetting password',
                description: 'Please wait...',
            });
        }
        if (!resetPasswordLoading && resetPasswordData) {
            notification.success({
                key: 'resetPassword',
                message: 'Password reset successfully.',
                description: 'Please login with your new password',
            });
            navigate('/login');
        }
        if (!resetPasswordLoading && resetPasswordError) {
            notification.error({
                key: 'resetPassword',
                message: resetPasswordError?.error || resetPasswordError?.data.error,
                description: resetPasswordError?.data?.description,
            });
        }
    }, [navigate, resetPasswordData, resetPasswordError, resetPasswordLoading]);

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
                                Reset Password
                            </h2>
                        </div>
                        <Form layout="vertical" onFinish={onFinish}>
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
                                        className="input input-bordered text-base-content antdInputPassword antdInputPasswordIcon"
                                        placeholder="min 6 chars long"
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label className="text-base-content">Confirm Password</label>
                                }
                                className="form-control text-base-100"
                            >
                                <Form.Item
                                    name="confirmPassword"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Confrim password is required',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="input input-bordered text-base-content antdInputPassword antdInputPasswordIcon"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item className="form-control">
                                <Button
                                    className="btn w-full btn-primary hover:text-base-100 focus:btn-primary ring-primary focus:ring-1 ring-offset-2 mt-4"
                                    htmlType="submit"
                                >
                                    Reset Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
