import express from 'express';
import { getHabits, createHabit, getOneHabit, updateOneHabit, deleteOneHabit, markAsDone } from '../controllers/habitController.js';
import { requireAuth } from '../middlewere/requireAuth.js';

const router = express.Router();


router.get('/', requireAuth, getHabits);
router.post('/', requireAuth, createHabit);
router.get('/:id', requireAuth, getOneHabit);
router.put('/:id', requireAuth, updateOneHabit);
router.delete('/:id', requireAuth, deleteOneHabit);
router.post('/:id/complete', requireAuth, markAsDone);

export default router;