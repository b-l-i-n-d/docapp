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
    const { page, limit, doctorId, count, date } = req.query;

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

        // const appointments = doctorId
        //     ? Appointment.find({
        //           doctorId,
        //       }).lean()
        //     : Appointment.find({
        //           userId,
        //       })
        //           .populate('doctorId', 'name')
        //           .sort({ date: -1 })
        //           .lean();

        let appointments = null;

        switch (true) {
            case doctorId && date && true: {
                appointments = Appointment.find({
                    doctorId,
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
                break;
            }
            case doctorId && !date && true: {
                appointments = Appointment.find({
                    doctorId,
                })
                    .populate('doctorId', 'name')
                    .lean();
                break;
            }
            case !doctorId && date && true: {
                appointments = Appointment.find({
                    date: new Date(date),
                })
                    .populate('doctorId', 'name')
                    .lean();
                break;
            }
            case !doctorId && !date && true: {
                appointments = Appointment.find({
                    userId,
                })
                    .populate('doctorId', 'name')
                    .sort({ date: -1 })
                    .lean();
                break;
            }
            default: {
                break;
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

// const getAppointmentsCount = async (req, res) => {
//     const { id: doctorId, date } = req.params;

//     try {
//         if (doctorId) {
//             if (!mongoose.Types.ObjectId.isValid(doctorId)) {
//                 return res.status(400).json({
//                     error: 'Invalid doctor id',
//                 });
//             }
//         }

//         let appointmentsCount = 0;
//         switch (true) {
//             case doctorId && date && true: {
//                 appointmentsCount = await Appointment.countDocuments({
//                     doctorId,
//                     date: new Date(date),
//                 });
//                 break;
//             }
//             case doctorId && !date && true: {
//                 appointmentsCount = await Appointment.countDocuments({
//                     doctorId,
//                 });
//                 break;
//             }
//             default: {
//                 break;
//             }
//         }

//         return res.status(200).json(appointmentsCount);
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message,
//         });
//     }
// };

export default { createAppointment, getAppointments /* getAppointmentsCount */ };
