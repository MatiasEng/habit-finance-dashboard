// Load env FIRST
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './db/connect.js';

// Middleware
import logger from './middlewere/logger.js';

// Routes
import usersRoutes from './routes/userRoutes.js';
import habitsRoutes from './routes/habitRoutes.js';
import expensesRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Railway injects PORT — do NOT hardcode
const PORT = process.env.PORT || 5050;

/* -------------------- MIDDLEWARE -------------------- */

// JSON
app.use(express.json());

// Logger
app.use(logger);

// CORS — explicit, single origin
app.use(
  cors({
    origin: 'https://frontend-production-3277.up.railway.app',
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */

// Health check — MUST work even if DB dies
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes
app.use('/api/users', usersRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Backend running');
});

/* -------------------- SERVER START -------------------- */

// START SERVER FIRST (critical for Railway)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

// THEN connect DB (never block HTTP)
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
  });

// Crash visibility
process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

