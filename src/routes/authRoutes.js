import express from 'express';

import {registerUser, loginUser, logoutUser, refreshAccessToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);

// Left to implement
router.post('/logout', logoutUser);

export default router;