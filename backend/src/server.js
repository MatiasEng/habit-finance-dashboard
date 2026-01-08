import dotenv from 'dotenv';
dotenv.config();

// Generate keys
// require('crypto').randomBytes(64).toString('hex')
import express from 'express';
import connectDB from './db/connect.js';
import cors from 'cors';

// Middlewere
import logger from './middlewere/logger.js';

// Routes
import usersRoutes from './routes/userRoutes.js'
import habitsRoutes from './routes/habitRoutes.js'
import expensesRoutes from './routes/expenseRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'https://frontend-production-3277.up.railway.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
/*
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); // Fix for production
*/
//app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

// Home Page Landing
app.get('/', (req, res) => {
  res.send('<h1>Habits and Finance DashBoard</h1>');
});


// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
  });
}

startServer();
