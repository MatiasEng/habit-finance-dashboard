import express from 'express';
import { getEntireDashboard } from '../controllers/dashboardController.js';
import { requireAuth } from '../middlewere/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, getEntireDashboard)

export default router;