// src/routes/taskRoutes.js
import express from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// GET - /api/tasks
router.get('/', getAllTasks);


// GET - /api/tasks/:id
router.get('/:id', getTask);

// POST - /api/tasks
router.post('/', createTask);

// PUT - /api/tasks/:id
router.put('/:id', updateTask);

// DELETE - /api/tasks/:id
router.delete('/:id', deleteTask);

export default router;