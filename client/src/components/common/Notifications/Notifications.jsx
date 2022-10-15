import { Card, Tabs } from 'antd';
import React from 'react';
import NotificationList from './NotificationList';

function Notifications() {
    const notificationTabs = [
        {
            label: 'Unseen Notifications',
            key: 'unseen',
            children: <NotificationList />,
        },
        {
            label: 'Seen Notifications',
            key: 'seen',
            children: <NotificationList />,
        },
    ];
    return (
        <Card className="w-96">
            <Tabs defaultActiveKey="unseen" centered items={notificationTabs} />
        </Card>
    );
}

export default Notifications;
