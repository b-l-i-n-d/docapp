/* eslint-disable no-nested-ternary */
import { List, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

function ListItem({ appointment }) {
    return (
        <List.Item
            className="flex justify-between"
            key={appointment._id}
            extra={
                <div>
                    {appointment.type === 'New' ? (
                        <Tag color="green">New</Tag>
                    ) : appointment.type === 'Follow Up' ? (
                        <Tag color="blue">Follow Up</Tag>
                    ) : (
                        <Tag color="orange">Report</Tag>
                    )}
                    <Typography.Text strong>
                        Date:{' '}
                        <span className="text-primary">
                            {dayjs(appointment.date).format('DD-MMM-YYYY')}
                        </span>
                    </Typography.Text>
                </div>
            }
        >
            <List.Item.Meta
                title={`Name: ${appointment.name}`}
                description={
                    <>
                        <Typography.Text strong>
                            Phone: <span className="text-primary">{appointment.phone}</span>
                        </Typography.Text>
                        <br />
                        <Typography.Text strong>
                            Age: <span className="text-primary">{appointment.age}</span>
                        </Typography.Text>
                    </>
                }
            />
            <Space direction="vertical" className="mr-4">
                <Typography.Text strong>Doctor: {appointment.doctorId.name}</Typography.Text>
            </Space>
        </List.Item>
    );
}

export default ListItem;
