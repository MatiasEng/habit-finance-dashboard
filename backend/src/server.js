
/*
import dotenv from 'dotenv';
dotenv.config();  // Load env FIRST

import express from 'express';
import connectDB from './db/connect.js';
import cors from 'cors';

// Middleware
import logger from './middlewere/logger.js';

const app = express();
const PORT = process.env.PORT || 5050;


app.use(cors({
  origin: 'https://frontend-production-3277.up.railway.app',
  credentials: true,
}));

app.post('/api/auth/register', (req, res) => {
  res.json({ ok: true });
});

// Routes
import usersRoutes from './routes/userRoutes.js';
import habitsRoutes from './routes/habitRoutes.js';
import expensesRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';


// CORS Configuration - Use environment variable
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://frontend-production-3277.up.railway.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
//app.options('/api/*', cors(corsOptions));  // Only for API routes

app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Home Page Landing
app.get('/', (req, res) => {
  res.send('<h1>Habits and Finance Dashboard</h1>');
});

// Start Server
async function startServer() {
  try {
    //await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
startServer();

*/


import express from 'express';

const app = express();
const PORT = process.env.PORT || 5050;

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('LISTENING ON', PORT);
});

