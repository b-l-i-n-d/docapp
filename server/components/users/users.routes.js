import express from 'express';
import { auth, validator } from '../../middlewares/index.js';
import { usersController } from './index.js';

const router = express.Router();

router.post('/login', [auth.isUserExists, auth.isPasswordCorrect], usersController.login);
router.post(
    '/signup',
    [validator.userValidationRules(), validator.validate, auth.isEmailExists],
    usersController.signup
);

export default router;
