import { Card } from 'antd';
import React from 'react';
import { Common } from '../components';
import { useGetNotificationQuery } from '../redux/api/userAPI';

function AllNotifications() {
    const { data: allNotifications, isLoading: isAllNotificationLoading } =
        useGetNotificationQuery(undefined);
    return (
        <Card
            loading={isAllNotificationLoading}
            style={{
                width: '100%',
            }}
            title="All Notifications"
        >
            <Common.Notifications notificationData={allNotifications} width="w-full" pagination />
        </Card>
    );
}

export default AllNotifications;
