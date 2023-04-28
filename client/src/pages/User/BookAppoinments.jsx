import { Card, Space, Typography } from 'antd';
import React from 'react';
import { Doctor } from '../../components';
import { useGetApprovedDoctorsQuery } from '../../redux/api/doctorAPI';

function BookAppionments() {
    const { data, isLoading } = useGetApprovedDoctorsQuery();
    const { Title } = Typography;

    const cardElements = data?.map((doctor) => (
        <Doctor.DoctorCard key={doctor._id} doctor={doctor} isLoading={isLoading} />
    ));
    return (
        <Card loading={isLoading} title="Book Appionments">
            <Space direction="vertical" size="middle">
                {cardElements?.length > 0 ? (
                    cardElements
                ) : (
                    <Title level={3}>No doctors available</Title>
                )}
            </Space>
        </Card>
    );
}

export default BookAppionments;
