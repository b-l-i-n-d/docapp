import express from 'express';
import { auth, doctors } from '../../middlewares/index.js';
import { doctorsController } from './index.js';

const router = express.Router();

// Get all doctors - only for admin
router.get(
    '/',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    doctorsController.getAllDoctors
);

// Create new doctor
router.post(
    '/',
    [
        auth.verifyRefreshToken,
        auth.verifyAccessToken,
        auth.isUserExists,
        auth.isPasswordCorrect,
        doctors.isDoctorExists,
    ],
    doctorsController.createDoctor
);

// Get apptoved doctors
router.get('/approved', doctorsController.getApprovedDoctors);

// Get my doctor info
router.get('/me', [auth.verifyRefreshToken, auth.verifyAccessToken], doctorsController.getDoctor);

// Get doctor by id
router.get('/:id', [auth.verifyRefreshToken, auth.verifyAccessToken], doctorsController.getDoctor);

// Update doctor by id
router.patch(
    '/:id',
    [auth.verifyRefreshToken, auth.verifyAccessToken],
    doctorsController.updateDoctor
);

// Update doctor status by id (approve or reject) - only for admin
router.patch(
    '/:id/update-status',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    doctorsController.updateDoctorStatus
);

export default router;
