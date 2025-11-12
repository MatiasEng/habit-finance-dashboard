import express from 'express';
import { getMyProfile, updateProfile, deleteAccount, getAllUsers} from '../controllers/userControler.js'
import { requireAuth } from '../middlewere/requireAuth.js';
import { requireAdmin} from '../middlewere/requireAdmin.js';
import { updateValidation } from '../middlewere/validateUser.js';

const router = express.Router();


router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, updateValidation, updateProfile);
router.delete('/me', requireAuth, deleteAccount);
router.get('/', requireAuth,requireAdmin, getAllUsers);

export default router;