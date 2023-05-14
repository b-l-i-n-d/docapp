import { Button, Card, Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';

function DoctorCard({ isLoading, doctor }) {
    const { Title, Paragraph, Text } = Typography;
    const { _id, image, title, name, specialized, workplace, department, chamber } = doctor;
    return (
        <Card
            loading={isLoading}
            key={_id}
            hoverable
            style={{
                cursor: 'unset',
            }}
        >
            <Card.Grid hoverable={false} style={{ width: '15%', textAlign: 'center' }}>
                <Image
                    loading="lazy"
                    height="100%"
                    width="100%"
                    className="rounded-2xl object-cover"
                    src={image}
                    placeholder={avatarPlaceholder}
                    alt="doctorImage"
                />
            </Card.Grid>

            <Card.Grid hoverable={false} style={{ width: '30%' }}>
                <Text strong>{title}</Text>
                <Title
                    level={4}
                    style={{
                        marginTop: 4,
                    }}
                >
                    {name}
                </Title>
                <Text>Spelization</Text>
                <Paragraph className="text-primary" strong style={{ marginBottom: 0 }}>
                    {specialized}
                </Paragraph>
            </Card.Grid>

            <Card.Grid hoverable={false} style={{ width: '35%' }}>
                <Text>Workplace</Text>
                <Paragraph strong>{workplace.orgName}</Paragraph>

                <Text>Department</Text>
                <Paragraph strong style={{ marginBottom: 0 }}>
                    {department.name}
                </Paragraph>
            </Card.Grid>

            <Card.Grid hoverable={false} style={{ width: '20%' }}>
                <Text strong>Fee Pre Consultation</Text>
                <Title
                    level={2}
                    style={{
                        marginTop: 4,
                    }}
                >
                    ৳ {chamber.fees}
                </Title>
                <Link to={_id}>
                    <Button type="primary">Book Appointment</Button>
                </Link>
            </Card.Grid>
        </Card>
    );
}

export default DoctorCard;
