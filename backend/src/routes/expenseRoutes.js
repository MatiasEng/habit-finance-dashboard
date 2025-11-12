import express from 'express';

import { getExpenses, addExpense, getOneExpense, updateOneExpense, deleteOneExpense } from '../controllers/expenseController.js';
import { createValidation, updateValidation,  idValidation } from '../middlewere/validateExpense.js';
import { requireAuth } from '../middlewere/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, getExpenses);
router.post('/', requireAuth, createValidation, addExpense);
router.get('/:id', requireAuth, idValidation, getOneExpense);
router.put('/:id', requireAuth, idValidation, updateValidation, updateOneExpense);
router.delete('/:id', requireAuth, idValidation, deleteOneExpense);

export default router;
