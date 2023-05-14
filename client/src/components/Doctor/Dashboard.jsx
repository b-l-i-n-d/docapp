import { NumberOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { chartColor } from '../../helpers';
import { useGetDoctorDashboardDataQuery } from '../../redux/api/dashboardAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Colors,
    Tooltip,
    Legend,
    Title,
    Filler
);

function Dashboard() {
    const doctorId = useSelector((state) => state.userState.user.isDoctor);
    const { data: dashboardData, isLoading: isDashboardLoading } =
        useGetDoctorDashboardDataQuery(doctorId);
    const appointmentsByTypeChartData = {
        labels: dashboardData?.appointmentsByType.map((item) => item.type),
        datasets: [
            {
                label: 'Appointments',
                data: dashboardData?.appointmentsByType.map((item) => item.count),
                ...chartColor(dashboardData?.appointmentsByType.length),
                borderWidth: 1,
            },
        ],
    };

    const appointmentsByAgeChartData = {
        labels: dashboardData?.appointmentsByAge.map((item) => item.age),
        datasets: [
            {
                label: 'Appointments',
                data: dashboardData?.appointmentsByAge.map((item) => item.count),
                ...chartColor(1),
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const appointmentsByGenderChartData = {
        labels: dashboardData?.appointmentsByGender.map((item) => item.gender),
        datasets: [
            {
                label: 'Appointments',
                data: dashboardData?.appointmentsByGender.map((item) => item.count),
                ...chartColor(dashboardData?.appointmentsByGender.length),
                borderWidth: 1,
            },
        ],
    };

    const appointmentsByWeekDay = {
        labels: dashboardData?.appointmentsByWeekDay.map((item) => {
            switch (item.weekDay) {
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
                default:
                    return '';
            }
        }),
        datasets: [
            {
                label: 'Appointments %',
                data: dashboardData?.appointmentsByWeekDay.map((item) => item.parcentage),
                ...chartColor(dashboardData?.appointmentsByWeekDay.length),
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const last30dates = Array.from(Array(30).keys())
        .reverse()
        .map((item) =>
            dayjs(dayjs().add(7, 'day').format('YYYY-MM-DD'))
                .subtract(item, 'day')
                .format('YYYY-MM-DD')
        );

    const appointmentsByDateChartData = {
        labels: last30dates,
        datasets: [
            {
                fill: true,
                label: 'Appointments',
                data: last30dates.map((date) => {
                    const appointment = dashboardData?.appointmentsByDate.find(
                        (item) => item.date === date
                    );
                    return appointment ? appointment.count : 0;
                }),
                ...chartColor(1),
                borderWidth: 1,
            },
        ],
    };
    return (
        <Card
            title="Dashboard"
            loading={isDashboardLoading}
            style={{
                backgroundColor: 'transparent',
            }}
        >
            <Row gutter={[16, 16]}>
                <Col
                    span={4}
                    style={{
                        height: 298,
                    }}
                >
                    <div className="w-full h-full flex flex-col justify-between">
                        <Card bordered={false} title="Total Appointments">
                            <Statistic
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                                value={dashboardData?.totalAppointments}
                                prefix={<NumberOutlined />}
                            />
                        </Card>
                        <Card bordered={false} title="Average Appointments">
                            <Statistic
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                                value={dashboardData?.averageAppointmentsPerDay}
                                prefix={<NumberOutlined />}
                            />
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="flex justify-center items-center">
                        <Pie
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Type',
                                    },
                                },
                            }}
                            height={250}
                            data={appointmentsByTypeChartData}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="flex justify-center items-center">
                        <Bar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Age',
                                    },
                                    filler: {
                                        propagate: true,
                                    },
                                },
                            }}
                            height={250}
                            data={appointmentsByAgeChartData}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="flex justify-center items-center">
                        <Pie
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Gender',
                                    },
                                },
                            }}
                            height={250}
                            data={appointmentsByGenderChartData}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="flex justify-center items-center">
                        <Bar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Week Day',
                                    },
                                },
                            }}
                            height={250}
                            data={appointmentsByWeekDay}
                        />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card bordered={false}>
                        <Line
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Appointments by Date',
                                    },
                                },
                            }}
                            height={250}
                            data={appointmentsByDateChartData}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default Dashboard;
