import mongoose from 'mongoose';
import { appointmentsModel } from '../appointments/index.js';
import { doctorsModel } from '../doctors/index.js';
import { userModel } from '../users/index.js';

const getDoctorDashboardData = async (req, res) => {
    const { doctorId } = req.query;

    try {
        if (doctorId) {
            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return res.status(400).json({
                    error: 'Invalid doctor id',
                });
            }

            const doctor = await doctorsModel.findById(doctorId).lean();

            if (!doctor) {
                return res.status(404).json({
                    error: 'Doctor not found',
                });
            }
        }

        const totalAppointments = await appointmentsModel
            .find({
                doctorId: mongoose.Types.ObjectId(doctorId),
            })
            .countDocuments();

        // average appointments per day
        const averageAppointmentsPerDay = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$date',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    average: { $avg: '$count' },
                },
            },
            {
                $project: {
                    _id: 0,
                    average: 1,
                },
            },
        ]);

        const appointmentsByType = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    type: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        // last 30 days appointments by date
        const appointmentsByDate = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                    date: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$date',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByWeekDay = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    weekDay: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByGender = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    gender: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByAge = await appointmentsModel.aggregate([
            {
                $match: {
                    doctorId: mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 0] }, { $lt: ['$age', 18] }],
                                    },
                                    then: '0-18',
                                },
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 18] }, { $lt: ['$age', 40] }],
                                    },
                                    then: '18-40',
                                },
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 40] }, { $lt: ['$age', 60] }],
                                    },
                                    then: '40-60',
                                },
                            ],
                            default: '60+',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    age: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        return res.status(200).json({
            totalAppointments,
            averageAppointmentsPerDay: averageAppointmentsPerDay[0]?.average || 0,
            appointmentsByType,
            appointmentsByDate,
            appointmentsByWeekDay,
            appointmentsByGender,
            appointmentsByAge,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getAdminDashboardData = async (req, res) => {
    try {
        const totalAppointments = await appointmentsModel.countDocuments();

        const totalUsers = await userModel.countDocuments();

        const totalApprovedDoctors = await doctorsModel.countDocuments({
            status: 'approved',
        });

        // average appointments per day
        const averageAppointmentsPerDay = await appointmentsModel.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$date',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    average: { $avg: '$count' },
                },
            },
            {
                $project: {
                    _id: 0,
                    average: 1,
                },
            },
        ]);

        const appointmentsByType = await appointmentsModel.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    type: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        // last 30 days appointments by date
        const appointmentsByDate = await appointmentsModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$date',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByWeekDay = await appointmentsModel.aggregate([
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    weekDay: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByGender = await appointmentsModel.aggregate([
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    gender: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        const appointmentsByAge = await appointmentsModel.aggregate([
            {
                $group: {
                    _id: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 0] }, { $lt: ['$age', 18] }],
                                    },
                                    then: '0-18',
                                },
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 18] }, { $lt: ['$age', 40] }],
                                    },
                                    then: '18-40',
                                },
                                {
                                    case: {
                                        $and: [{ $gte: ['$age', 40] }, { $lt: ['$age', 60] }],
                                    },
                                    then: '40-60',
                                },
                            ],
                            default: '60+',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    age: '$_id',
                    count: 1,
                    parcentage: {
                        $multiply: [
                            {
                                $divide: ['$count', totalAppointments],
                            },
                            100,
                        ],
                    },
                },
            },
        ]);

        return res.status(200).json({
            totalAppointments,
            totalApprovedDoctors,
            totalUsers,
            averageAppointmentsPerDay: averageAppointmentsPerDay[0]?.average || 0,
            appointmentsByType,
            appointmentsByDate,
            appointmentsByWeekDay,
            appointmentsByGender,
            appointmentsByAge,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default {
    getDoctorDashboardData,
    getAdminDashboardData,
};
