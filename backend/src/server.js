import dotenv from 'dotenv';
console.log('1');
dotenv.config();
// Generate keys
// require('crypto').randomBytes(64).toString('hex')
import express from 'express';
console.log('2');
import connectDB from './db/connect.js';
console.log('3');
import cors from 'cors';
console.log('4');

// Middlewere
import logger from './middlewere/logger.js';
console.log('5');

// Routes
import usersRoutes from './routes/userRoutes.js'
console.log('5');
import habitsRoutes from './routes/habitRoutes.js'
console.log('6');
import expensesRoutes from './routes/expenseRoutes.js'
console.log('7');
import dashboardRoutes from './routes/dashboardRoutes.js'
console.log('8');
import authRoutes from './routes/authRoutes.js';
console.log('9');


const app = express();
const PORT = process.env.PORT || 5000;

/*
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); // Fix for production
*/
app.use(cors());
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