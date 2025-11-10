import express from 'express';
import { requireAuth } from '../middlewere/requireAuth.js';
import {getHabits, createHabit,getOneHabit, updateOneHabit, deleteOneHabit, markAsDone} from '../controllers/habitController.js';
import {createValidation, idValidation} from '../middlewere/validateHabit.js';

const router = express.Router();


router.get('/', requireAuth, getHabits);
router.post('/', requireAuth, createValidation, createHabit); 
router.get('/:id', requireAuth, idValidation, getOneHabit);
router.put('/:id', requireAuth, idValidation, updateOneHabit);
router.delete('/:id', requireAuth, idValidation, deleteOneHabit);
router.post('/:id/complete', requireAuth, idValidation, markAsDone);

export default router;