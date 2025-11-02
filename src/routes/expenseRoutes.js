import express from 'express';

import { getExpenses, addExpense, getOneExpense, updateOneExpense, deleteOneExpense } from '../controllers/expenseController.js';
import { requireAuth } from '../middlewere/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, getExpenses);
router.post('/', requireAuth, addExpense);
router.get('/', requireAuth, getOneExpense);
router.put('/', requireAuth, updateOneExpense);
router.delete('/', requireAuth, deleteOneExpense);

export default router;
