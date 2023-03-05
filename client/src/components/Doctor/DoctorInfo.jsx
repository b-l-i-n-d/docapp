import { LoadingOutlined } from '@ant-design/icons';
import { Card, Descriptions, Divider, Steps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { AiOutlineFileDone, AiOutlineUser } from 'react-icons/ai';

function DoctorInfo({ doctorData }) {
    return (
        doctorData && (
            <>
                <Card>
                    <Steps
                        items={[
                            {
                                title: 'Doctor Account Creation',
                                description: 'Doctor account is created',
                                status: 'finish',
                                icon: <AiOutlineUser />,
                            },
                            {
                                title: 'Verification',
                                description: 'Waiting for verification',
                                status: 'process',
                                icon: <LoadingOutlined />,
                            },
                            {
                                title: 'Done',
                                description: 'Doctor account is approved',
                                status: 'wait',
                                icon: <AiOutlineFileDone />,
                            },
                        ]}
                    />
                </Card>
                <Divider />
                <Descriptions
                    layout="vertical"
                    title="Personal Information"
                    bordered
                    column={{
                        xxl: 4,
                        xl: 3,
                        lg: 3,
                        md: 3,
                        sm: 2,
                        xs: 1,
                    }}
                >
                    <Descriptions.Item label="Name">{doctorData.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{doctorData.email}</Descriptions.Item>
                    <Descriptions.Item label="Natioanl ID">
                        {doctorData.nationalId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">{doctorData.gender}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                        {dayjs(doctorData.dateOfBirth).format('DD-MM-YYYY')}
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions
                    layout="vertical"
                    title="Professional Information"
                    bordered
                    column={{
                        xxl: 4,
                        xl: 3,
                        lg: 3,
                        md: 3,
                        sm: 2,
                        xs: 1,
                    }}
                >
                    <Descriptions.Item label="Title">{doctorData.title}</Descriptions.Item>
                    <Descriptions.Item label="Present Address">
                        {doctorData.presentAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="Doctor Type">
                        {doctorData.doctorType}
                    </Descriptions.Item>
                    <Descriptions.Item label="BMDC Regidtration No">
                        {doctorData.bmdcRegNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="Departmnet">
                        {doctorData.department}
                    </Descriptions.Item>
                    <Descriptions.Item label="Specialized in">
                        {doctorData.specialized}
                    </Descriptions.Item>
                    <Descriptions.Item label="Current Workplace">
                        {doctorData.workplace}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions
                    layout="vertical"
                    title="Chmaber Information"
                    bordered
                    column={{
                        xxl: 4,
                        xl: 3,
                        lg: 3,
                        md: 3,
                        sm: 2,
                        xs: 1,
                    }}
                >
                    <Descriptions.Item label="Chamber Location">
                        {doctorData.chamber.location}
                    </Descriptions.Item>
                    <Descriptions.Item label="Fees">{doctorData.chamber.fees}</Descriptions.Item>
                    <Descriptions.Item label="Chamber Days">
                        {doctorData.chamber.activeDay.map((day) => (
                            <span key={day}>
                                {day} <Divider type="vertical" />
                            </span>
                        ))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chamber Time">
                        <span>Start Time: {dayjs(doctorData.chamber.time[0]).format('hh:mm')}</span>
                        <Divider type="vertical" />
                        <span>End Time: {dayjs(doctorData.chamber.time[1]).format('hh:mm')}</span>
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
    );
}

export default DoctorInfo;
