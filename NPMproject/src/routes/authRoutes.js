/*
// routes/authRoutes.js
const router = express.Router();

// POST /auth/register     → Create account
router.post('/register', registerUser);

// POST /auth/login        → Get JWT token
router.post('/login', loginUser);

// POST /auth/logout       → (optional) blacklist token
router.post('/logout', requireAuth, logoutUser);

// POST /auth/forgot-password → Send reset email
router.post('/forgot-password', forgotPassword);

// POST /auth/reset-password → Reset with token
router.post('/reset-password', resetPassword);

export default router;
*/
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)



export default authRouter;