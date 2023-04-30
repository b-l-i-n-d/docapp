import express from 'express';
import { auth } from '../../middlewares/index.js';
import { departmentsController } from './index.js';

const router = express.Router();

// Get all departments
router.get('/', departmentsController.getAllDepartments);

// Create new department
router.post(
    '/',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    departmentsController.createDepartment
);

// Get department by id
router.get('/:id', departmentsController.getDepartmentById);

// Update department by id
router.patch(
    '/:id',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    departmentsController.updateDepartmentById
);

// Delete department by id
router.delete(
    '/:id',
    [auth.verifyRefreshToken, auth.verifyAccessToken, auth.isAdmin],
    departmentsController.deleteDepartmentById
);

export default router;
