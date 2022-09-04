import express from 'express';
import { login, signup } from './usersControllers.js';
import { userValidationRules, validate } from './usersValidator.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', userValidationRules(), validate, signup);

export default router;
