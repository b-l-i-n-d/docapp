import express from 'express';
import { workplacesContoller } from './index.js';

const router = express.Router();

// Get all workplaces
router.get('/', workplacesContoller.getAllWorkplaces);

export default router;
