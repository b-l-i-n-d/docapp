import express from 'express';
import { auth, doctors } from '../../middlewares/index.js';
import { dashboardController } from './index.js';

const router = express.Router();

router.get(
    '/doctor',
    [auth.verifyRefreshToken, auth.verifyAccessToken, doctors.isLoggedUserDoctor],
    dashboardController.getDoctorDashboardData
);

router.get(
    '/admin',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    dashboardController.getAdminDashboardData
);

export default router;
