/*
// GET /api/users/:id      → Get user by ID
router.get('/:id', requireAuth, getUserById);

// PUT /api/users/me       → Update my profile
router.put('/me', requireAuth, updateMyProfile);

// DELETE /api/users/me    → Delete my account
router.delete('/me', requireAuth, deleteMyAccount);

// ADMIN ONLY
router.delete('/:id', requireAuth, requireAdmin, deleteUser);

export default router;
*/
import express from 'express';
import { requireAuth } from '../middlewere/requireAuth.js';
import {requireAdmin} from '../middlewere/requireAdmin.js'
import { getMyProfile, getAllUsers} from '../controllers/userController.js'

const userRoutes = express.Router();

userRoutes.get('/me', requireAuth, getMyProfile);
userRoutes.get('/', requireAuth, requireAdmin, getAllUsers);


export default userRoutes;