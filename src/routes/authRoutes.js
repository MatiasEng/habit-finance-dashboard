import express from 'express';

import { registerUser, loginUser, logoutUser, refreshAccessToken } from '../controllers/authController.js';
import { registerValidation, loginValidation, refreshValidation, logoutValidation } from '../middlewere/validateUser.js';

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/refresh', refreshValidation, refreshAccessToken);

// Left to implement
router.post('/logout', loginValidation, logoutUser);

export default router;