import {
    EnvironmentOutlined,
    MoneyCollectOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Alert, Card, Col, Divider, Image, Row, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import {
    MdOutlineAccessTime,
    MdOutlineAppRegistration,
    MdOutlineCalendarToday,
    MdOutlineFemale,
    MdOutlineMale,
    MdWorkOutline,
} from 'react-icons/md';
import { useParams } from 'react-router-dom';
import avatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { Appointment } from '../../components';
import { getFutureDate } from '../../helpers';
import { useGetDoctorByIdQuery } from '../../redux/api/doctorAPI';

dayjs.extend(relativeTime);

function DoctorDetails() {
    const { doctorId } = useParams();
    const { data: doctor, isLoading } = useGetDoctorByIdQuery(doctorId);
    const { Title, Text } = Typography;

    const getChamberDays = (days) =>
        days?.map((day) => {
            switch (day.day) {
                case 'Sunday':
                    return getFutureDate(0);
                case 'Monday':
                    return getFutureDate(1);
                case 'Tuesday':
                    return getFutureDate(2);
                case 'Wednesday':
                    return getFutureDate(3);
                case 'Thursday':
                    return getFutureDate(4);
                case 'Friday':
                    return getFutureDate(5);
                case 'Saturday':
                    return getFutureDate(6);
                default:
                    return getFutureDate(0);
            }
        });

    const chamberDays = getChamberDays(doctor?.chamber?.days);

    const closestDay = chamberDays?.reduce((prev, curr) =>
        Math.abs(curr - new Date()) < Math.abs(prev - new Date()) ? curr : prev
    );

    const chamberDaysItems = doctor?.chamber?.days.map((day) => (
        <Space key={Math.random()}>
            <Space>
                <MdOutlineCalendarToday />
                <span className="font-bold">{day.day}</span>
            </Space>
            <Space>
                <MdOutlineAccessTime />
                <span className="font-bold">
                    {dayjs(day.time[0]).format('hh:mm A')} -{dayjs(day.time[1]).format('hh:mm A')}
                </span>
            </Space>
        </Space>
    ));

    return (
        <Card
            loading={isLoading}
            title={
                <span>
                    Book Appionment of <span className="text-primary">{doctor?.name}</span>
                </span>
            }
        >
            <Row gutter={16}>
                <Col span={4}>
                    <Image
                        className="object-cover rounded-2xl"
                        src={doctor?.image}
                        width="100%"
                        height="200px"
                        placeholder={avatarPlaceholder}
                        fallback={avatarPlaceholder}
                    />
                </Col>
                <Col span={6}>
                    <div className="ml-5">
                        <Space direction="vertical">
                            <Text strong>{doctor?.title}</Text>
                            <h2 className="text-3xl">{doctor?.name}</h2>
                            <Text strong className="text-primary">
                                {doctor?.specialized}
                            </Text>
                        </Space>
                        <br />
                        <Space size="small" direction="vertical" className="mt-5">
                            <Text strong>Department: {doctor?.department.name}</Text>
                            <Text strong>
                                Gender: {doctor?.gender} {'   '}
                                {doctor?.gender === 'Male' ? (
                                    <MdOutlineMale className="text-primary" size={20} />
                                ) : (
                                    <MdOutlineFemale className="text-primary" size={20} />
                                )}
                            </Text>
                        </Space>
                    </div>
                </Col>
                <Col span={6}>
                    <Space direction="vertical" size="middle">
                        <Space align="center">
                            <MdWorkOutline /> <Text strong>{doctor?.workplace.orgName}</Text>
                        </Space>
                        <Space align="center">
                            <MdOutlineAppRegistration /> <Text strong>BMDC Reg No:</Text>
                            <Text strong className="text-xl text-primary">
                                {doctor?.bmdcRegNo}
                            </Text>
                            <Tooltip title="Bangladesh Medical and Dental Council (BMDC) Registration Number">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </Space>
                    </Space>
                </Col>
                <Col span={8}>
                    <Space
                        direction="vertical"
                        align="center"
                        className="w-full h-full justify-center"
                    >
                        <Appointment.AppointmentModal
                            button="Book Appointment"
                            chamberDays={chamberDays}
                        />
                    </Space>
                </Col>
            </Row>

            <Divider />

            <Row gutter={30}>
                <Col span={8}>
                    <Space direction="vertical">
                        <Title level={5}>Chamber information</Title>
                        <Space align="center" size="middle">
                            <MoneyCollectOutlined />
                            <Title level={4}>
                                Fees:{' '}
                                <span className="text-primary">৳ {doctor?.chamber?.fees}</span>
                            </Title>
                            <Tooltip style={{ width: 500 }} title="Per consultation">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </Space>
                        <Space align="center" size="middle">
                            <EnvironmentOutlined />
                            <Text strong>{doctor?.chamber?.location}</Text>
                        </Space>
                    </Space>
                </Col>
                <Col span={8}>
                    <Space direction="vertical">
                        <Title level={5}>Schedule</Title>
                        {chamberDaysItems}
                    </Space>
                </Col>

                <Col span={8}>
                    <div className="flex justify-center flex-col items-center h-full">
                        <Alert
                            message={`Doctor will be available ${dayjs(closestDay).fromNow()}`}
                            description={`Next available date is ${dayjs(closestDay).format(
                                'dddd, MMMM D, YYYY'
                            )}. But you can book an appointment at any time.`}
                            showIcon
                        />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default DoctorDetails;
