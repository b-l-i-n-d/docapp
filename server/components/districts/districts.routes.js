import express from 'express';
import { auth } from '../../middlewares/index.js';
import { districtsController } from './index.js';

const router = express.Router();

// Get all districts
router.get('/', districtsController.getAllDistricts);

// Get district by id
router.get('/:id', districtsController.getDistrictById);

// Update district by id
router.patch(
    '/:id',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    districtsController.updateDistrictById
);

export default router;
