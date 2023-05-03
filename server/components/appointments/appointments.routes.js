import express from 'express';
import { auth, doctors } from '../../middlewares/index.js';
import { appointmentsController } from './index.js';

const router = express.Router();

// Add appointment
router.post(
    '/',
    [auth.verifyRefreshToken, auth.verifyAccessToken],
    appointmentsController.createAppointment
);

// Get appointments for logged user
router.get(
    '/me',
    [auth.verifyRefreshToken, auth.verifyAccessToken],
    appointmentsController.getAppointments
);

// Get appointments by query
router.get(
    '/',
    [auth.verifyRefreshToken, auth.verifyAccessToken, doctors.isLoggedUserDoctor],
    appointmentsController.getAppointments
);

// // Get appointments count by doctor id
// router.get(
//     '/get/:id/count',
//     [auth.verifyRefreshToken, auth.verifyAccessToken],
//     appointmentsController.getAppointmentsCount
// );

// // Get appointments count by doctor id and date
// router.get(
//     '/get/:id/count/:date',
//     [auth.verifyRefreshToken, auth.verifyAccessToken],
//     appointmentsController.getAppointmentsCount
// );

export default router;
