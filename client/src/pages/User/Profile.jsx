import { LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography, notification } from 'antd';
import React, { useEffect } from 'react';
import { useRequestPasswordResetMutation } from '../../redux/api/authAPI';

function Profile() {
    const [
        requestPasswordReset,
        { data: resetPasswordData, isLoading: resetPasswordLoading, error: resetPasswordError },
    ] = useRequestPasswordResetMutation();

    const onFinish = (values) => {
        requestPasswordReset(values);
    };

    useEffect(() => {
        if (resetPasswordLoading) {
            notification.open({
                key: 'resetPassword',
                duration: 0,
                message: 'Sending email',
                icon: <LoadingOutlined spin />,
            });
        }
        if (!resetPasswordLoading && resetPasswordData) {
            notification.success({
                key: 'resetPassword',
                message: 'Email sent.',
                description: 'Please check your email to reset password',
            });
        }
        if (!resetPasswordLoading && resetPasswordError) {
            notification.error({
                key: 'resetPassword',
                message: resetPasswordError?.error || resetPasswordError?.data.error,
                description: resetPasswordError?.data?.description,
            });
        }
    }, [resetPasswordData, resetPasswordError, resetPasswordLoading]);

    return (
        <Card title="Profile">
            <Row>
                <Col span={8}>
                    <Typography.Title level={5}>Change Password</Typography.Title>
                </Col>

                <Col span={16}>
                    <Form
                        name="basic"
                        wrapperCol={{
                            span: 10,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 2,
                            }}
                        >
                            <Button loading={resetPasswordLoading} type="primary" htmlType="submit">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default Profile;
