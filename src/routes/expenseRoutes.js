import express from 'express';

import { getExpenses, addExpense, getOneExpense, updateOneExpense, deleteOneExpense } from '../controllers/expenseController.js';
import { requireAuth } from '../middlewere/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, getExpenses);
router.post('/', requireAuth, addExpense);
router.get('/:id', requireAuth, getOneExpense);
router.put('/:id', requireAuth, updateOneExpense);
router.delete('/:id', requireAuth, deleteOneExpense);

export default router;
