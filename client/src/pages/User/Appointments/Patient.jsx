import { FilePdfOutlined, LoadingOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
    Alert,
    Button,
    Calendar,
    Card,
    Col,
    Divider,
    Modal,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchConfig } from '../../../configs';
import { getFutureDate } from '../../../helpers';
import {
    useGetDoctorAppointmentsQuery,
    useLazyGetDoctorAppointmentsQuery,
} from '../../../redux/api/appointmentAPI';
import { useGetDoctorByIdQuery } from '../../../redux/api/doctorAPI';
import { GeneratedAppiontmentPdf } from '../../../services';

dayjs.extend(relativeTime);

function Patient() {
    const user = useSelector((state) => state.userState.user);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctor } = useGetDoctorByIdQuery(user?.isDoctor, {
        skip: user?.isDoctor === 'no' || user?.isDoctor === 'pending',
    });
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
    const [date, setDate] = useState(undefined);
    const { data: doctorAppointmentsData, isLoading: isDoctorAppointmentsLoading } =
        useGetDoctorAppointmentsQuery(
            {
                id: user?.isDoctor,
                date,
                page: currentPage,
                limit: fetchConfig.LIMIT,
            },
            {
                skip: user?.isDoctor === 'no' || user?.isDoctor === 'pending',
            }
        );
    const { data: recentAppointmentsData, isLoading: isRecentAppointmentsLoading } =
        useGetDoctorAppointmentsQuery({
            id: user?.isDoctor,
            recent: 'true',
        });
    const { data: totalAppointmentsCount, isLoading: isTotalAppointmetsCountLoading } =
        useGetDoctorAppointmentsQuery(
            {
                id: user?.isDoctor,
                date,
                count: 'true',
            },
            {
                refetchOnMountOrArgChange: true,
            }
        );
    const [
        getTotalAppointmnets,
        { data: totalAppointments, isLoading: isGetTotalAppointmentsLoading },
    ] = useLazyGetDoctorAppointmentsQuery();
    const { data: doctorAppointments, total: doctorsTotal } = doctorAppointmentsData || {};

    const appointmentTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (d) => {
                if (dayjs().isAfter(dayjs(d))) {
                    return (
                        <Tag color="red">{dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}</Tag>
                    );
                }
                return <Tag color="green">{dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
                if (type === 'New') {
                    return <Tag color="green">{type.toUpperCase()}</Tag>;
                }
                if (type === 'Follow Up') {
                    return <Tag color="blue">{type.toUpperCase()}</Tag>;
                }
                return <Tag color="orange">{type.toUpperCase()}</Tag>;
            },
        },
    ];

    const recentAppointmentsTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (d) => {
                if (dayjs().isAfter(dayjs(d))) {
                    return (
                        <Tag color="red">{dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}</Tag>
                    );
                }
                return <Tag color="green">{dayjs(d).format('ddd, DD-MMM-YYYY').toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (d) => dayjs(d).fromNow(),
        },
    ];

    const dateCellRender = (value) => {
        if (date === value.format('YYYY-MM-DD')) {
            return (
                <Tag
                    color="purple-inverse"
                    style={{
                        margin: 0,
                    }}
                >
                    {!isTotalAppointmetsCountLoading && totalAppointmentsCount}
                </Tag>
            );
        }
        return null;
    };

    const calanderHeader = () => (
        <Space className="w-full justify-between mb-3">
            <Typography.Title level={5}>
                {date
                    ? `Showing appointments for ${dayjs(date).format('ddd, DD-MMM-YYYY')}`
                    : 'Showing all appointments'}
            </Typography.Title>

            <Button type="text" onClick={() => setDate(undefined)}>
                Reset
            </Button>
        </Space>
    );

    const handleTotalAppointmentsFetch = (selectedDate) => {
        if (selectedDate) {
            getTotalAppointmnets({
                id: user?.isDoctor,
                date,
            });
        }
    };

    useEffect(() => {
        if (isGetTotalAppointmentsLoading) {
            Modal.destroyAll();
            Modal.confirm({
                title: 'Generating PDF',
                icon: <LoadingOutlined />,
                footer: null,
            });
        }
        if (!isGetTotalAppointmentsLoading && totalAppointments) {
            Modal.destroyAll();
            Modal.confirm({
                title: 'Download PDF',
                icon: <FilePdfOutlined />,
                content: 'Click on Download to download the pdf of selected date appointments',
                closable: true,
                okText: (
                    <PDFDownloadLink
                        document={
                            <GeneratedAppiontmentPdf
                                doctor={doctor}
                                date={date}
                                appointments={totalAppointments.data}
                            />
                        }
                    >
                        Download
                    </PDFDownloadLink>
                ),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctor, isGetTotalAppointmentsLoading, totalAppointments]);

    return (
        <Card
            title="Patient Appointments"
            loading={isDoctorAppointmentsLoading}
            extra={
                !date ? (
                    <Alert message="Select Date to generate pdf report" type="warning" showIcon />
                ) : (
                    <Button
                        block
                        type="primary"
                        icon={<FilePdfOutlined />}
                        loading={isDoctorAppointmentsLoading}
                        onClick={
                            totalAppointments
                                ? () => {
                                      handleTotalAppointmentsFetch(date);
                                      Modal.destroyAll();
                                      Modal.confirm({
                                          title: 'Download PDF',
                                          icon: <FilePdfOutlined />,
                                          content:
                                              'Click on Download to download the pdf of selected date appointments',
                                          closable: true,
                                          okText: (
                                              <PDFDownloadLink
                                                  document={
                                                      <GeneratedAppiontmentPdf
                                                          doctor={doctor}
                                                          date={date}
                                                          appointments={totalAppointments.data}
                                                      />
                                                  }
                                              >
                                                  Download
                                              </PDFDownloadLink>
                                          ),
                                      });
                                  }
                                : () => handleTotalAppointmentsFetch(date)
                        }
                    >
                        Generate PDF
                    </Button>
                )
            }
        >
            <Row gutter={24}>
                <Col span={14}>
                    <Table
                        loading={isDoctorAppointmentsLoading}
                        dataSource={doctorAppointments}
                        pagination={{
                            current: currentPage,
                            doctorsTotal,
                            pageSize: import.meta.env.VITE_PAGE_SIZE,
                            onChange: (page) => setCurrentPage(page),
                            showTotal: (totalData) => `Total ${totalData} appointments`,
                        }}
                        columns={appointmentTableColumns}
                    />
                </Col>
                <Col span={10}>
                    <Space direction="vertical" size="large">
                        <Table
                            caption={
                                <Space className="mb-3">
                                    <Typography.Text strong>Recent Appointments</Typography.Text>
                                    <Typography.Text type="secondary">
                                        (Last 5 appointments created by you)
                                    </Typography.Text>
                                </Space>
                            }
                            loading={isRecentAppointmentsLoading}
                            dataSource={recentAppointmentsData}
                            pagination={false}
                            columns={recentAppointmentsTableColumns}
                        />

                        <Divider />

                        <Calendar
                            fullscreen={false}
                            value={dayjs(date)}
                            headerRender={calanderHeader}
                            disabledDate={(current) =>
                                !chamberDays?.includes(dayjs(current).format('YYYY-MM-DD'))
                            }
                            dateCellRender={dateCellRender}
                            onSelect={(value) => setDate(dayjs(value).format('YYYY-MM-DD'))}
                        />
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}

export default Patient;
