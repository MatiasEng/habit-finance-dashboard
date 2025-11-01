/*
// routes/userRoutes.js
const router = express.Router();

// GET /api/users          → Get all users (admin only)
router.get('/', getAllUsers);

// GET /api/users/me       → Get my profile
router.get('/me', requireAuth, getMyProfile);

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