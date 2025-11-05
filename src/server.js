// require('crypto').randomBytes(64).toString('hex')
import express from 'express';
import dotenv from 'dotenv';

// Middlewere
import logger from './middlewere/logger.js';

// Routes
import usersRoutes from '../src/routes/userRoutes.js'
import habitsRoutes from '../src/routes/habitRoutes.js'
import expensesRoutes from '../src/routes/expenseRoutes.js'
import dashboardRoutes from '../src/routes/dashboardRoutes.js'
import authRoutes from '../src/routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', usersRoutes) // done
app.use('/api/habits', habitsRoutes) // done
app.use('/api/expenses', expensesRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/auth', authRoutes) // only logout remaining

// Home Page Landing
app.get('/', (req, res) => {
  res.send('<h1>Habits and Finance DashBoard</h1>');
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});