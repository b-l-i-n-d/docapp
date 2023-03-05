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

router.get('/get', [auth.verifyRefreshToken, auth.verifyAccessToken], doctorsController.getDoctor);

router.get(
    '/get-all',
    [auth.verifyRefreshToken, auth.verifyAccessToken],
    doctorsController.getAllDoctors
);

export default router;
