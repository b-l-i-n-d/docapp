import { DeleteOutlined } from '@ant-design/icons/lib/icons';
import { Avatar, Button, List, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { AiOutlineNotification } from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import {
    useDeleteNotificationMutation,
    useUpdateNotificationMutation,
} from '../../../redux/api/userAPI';

dayjs.extend(relativeTime);

function NotificationList({ data, type, pagination }) {
    const icons = { ndr: FaStethoscope, default: AiOutlineNotification };
    const bgColor = {
        ndr: 'bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500',
        default: 'bg-primary',
    };
    const [updateNotification, { isLoading }] = useUpdateNotificationMutation();
    const [deleteNotification, { isLoading: isDeleteLoading }] = useDeleteNotificationMutation();

    const handleUpdateNotification = (id) => {
        updateNotification(id);
    };

    const handleDeleteNotification = (id) => {
        deleteNotification(id);
    };

    return (
        <List
            pagination={pagination ? { pageSize: 10 } : false}
            loading={isLoading || isDeleteLoading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => {
                const Icon = icons[item.type] ? icons[item.type] : icons.default;
                const bgColorClass = bgColor[item.type] ? bgColor[item.type] : bgColor.default;

                return (
                    <List.Item
                        actions={
                            type === 'seen' && [
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDeleteNotification(item._id)}
                                />,
                            ]
                        }
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar size="large" className={`${bgColorClass}`}>
                                    <Icon />
                                </Avatar>
                            }
                            title={
                                type === 'seen' ? (
                                    <Typography.Text>{item.message}</Typography.Text>
                                ) : (
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
                                    <Typography.Link
                                        onClick={() => handleUpdateNotification(item._id)}
                                    >
                                        {item.message}
                                    </Typography.Link>
                                )
                            }
                            description={dayjs(item.createdAt).fromNow()}
                        />
                    </List.Item>
                );
            }}
        />
    );
}

export default NotificationList;
