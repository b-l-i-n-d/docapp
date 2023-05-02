import { Card, Tabs } from 'antd';
import React from 'react';
import NotificationList from './NotificationList';

function Notifications({ notificationData }) {
    const notificationTabs = [
        {
            label: 'Unseen Notifications',
            key: 'unseen',
            children: <NotificationList data={notificationData?.unSeenNotification} />,
        },
        {
            label: 'Seen Notifications',
            key: 'seen',
            children: <NotificationList data={notificationData?.seenNotification} type="seen" />,
        },
    ];
    return (
        <Card className="w-96">
            <Tabs size="small" defaultActiveKey="unseen" centered items={notificationTabs} />
        </Card>
    );
}

export default Notifications;
