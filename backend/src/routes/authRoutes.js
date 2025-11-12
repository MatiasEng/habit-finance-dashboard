import express from 'express';

import { registerUser, loginUser, logoutUser, refreshAccessToken } from '../controllers/authController.js';
import { registerValidation, loginValidation, refreshValidation, logoutValidation } from '../middlewere/validateAuth.js';

const router = express.Router();

// Left to test Edge cases and errors
router.post('/register', registerValidation, registerUser); // works
router.post('/login', loginValidation, loginUser); // works
router.post('/refresh', refreshValidation, refreshAccessToken); // works
router.post('/logout', logoutValidation, logoutUser); // works

export default router;