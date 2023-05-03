import mongoose from 'mongoose';
import { helpers } from '../../utils/index.js';
import { doctorsModel } from '../doctors/index.js';
import Appointment from './appointments.model.js';

const createAppointment = async (req, res) => {
    const { doctorId, name, age, gender, date, type, phone } = req.body;
    const userId = res.locals.data._id;

    try {
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

        const appointment = await Appointment.create({
            doctorId,
            userId,
            date: new Date(date),
            name,
            age,
            gender,
            type,
            phone,
        });

        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getAppointments = async (req, res) => {
    const userId = res.locals.data._id;
    const { page, limit, doctorId, count, date, recent } = req.query;

    const url = req.originalUrl.split('?')[0].split('/');
    const lastSegment = url[url.length - 1];

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

        let appointments = null;

        if (lastSegment !== 'me') {
            if (recent === 'true' && doctorId) {
                const restlt = await Appointment.find({
                    doctorId,
                })
                    .populate('doctorId', 'name')
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .lean();
                return res.status(200).json(restlt);
            }

            if (doctorId && date) {
                appointments = Appointment.find({
                    doctorId,
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
            } else if (doctorId && !date) {
                appointments = Appointment.find({
                    doctorId,
                })
                    .populate('doctorId', 'name')
                    .lean();
            } else if (!doctorId && date) {
                appointments = Appointment.find({
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
            }
        } else if (lastSegment === 'me') {
            if (doctorId && date) {
                appointments = Appointment.find({
                    userId,
                    doctorId,
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
            } else if (doctorId && !date) {
                appointments = Appointment.find({
                    userId,
                    doctorId,
                })
                    .populate('doctorId', 'name')
                    .lean();
            } else if (!doctorId && date) {
                console.log(lastSegment === 'me');
                appointments = Appointment.find({
                    userId,
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
            } else if (!doctorId && !date) {
                appointments = Appointment.find({
                    userId,
                })
                    .populate('doctorId', 'name')
                    .sort({ date: -1 })
                    .lean();
            }
        }

        if (count === 'true') {
            return res.status(200).json((await appointments).length);
        }

        const results = await helpers.paginateQuery(appointments, page, limit);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default { createAppointment, getAppointments /* getAppointmentsCount */ };
