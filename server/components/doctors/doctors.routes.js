import express from 'express';
import { auth, doctors } from '../../middlewares/index.js';
import { doctorsController } from './index.js';

const router = express.Router();

router.post(
    '/add',
    [
        auth.verifyRefreshToken,
        auth.verifyAccessToken,
        auth.isUserExists,
        auth.isPasswordCorrect,
        doctors.isDoctorExists,
    ],
    doctorsController.createDoctor
);

export default router;
