import { Button, Card, Divider, Space, Tabs } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import NotificationList from './NotificationList';

function Notifications({ notificationData, width, centered, showViewAll, pagination }) {
    const notificationTabs = [
        {
            label: 'Unseen Notifications',
            key: 'unseen',
            children: (
                <NotificationList
                    data={notificationData?.unSeenNotification}
                    pagination={pagination}
                />
            ),
        },
        {
            label: 'Seen Notifications',
            key: 'seen',
            children: (
                <NotificationList
                    data={notificationData?.seenNotification}
                    type="seen"
                    pagination={pagination}
                />
            ),
        },
    ];
    return (
        <Card className={`${width || 'w-96'}`}>
            <Tabs
                size="small"
                defaultActiveKey="unseen"
                centered={centered}
                items={notificationTabs}
            />
            {showViewAll && (
                <>
                    <Divider />
                    <Space direction="vertical" className="w-full" align="center">
                        <Button type="primary">
                            <Link to="/notifications">View All</Link>
                        </Button>
                    </Space>
                </>
            )}
        </Card>
    );
}

export default Notifications;
