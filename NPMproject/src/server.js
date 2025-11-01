// server.js
import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/routes/taskRoutes.js';
import { errorHandler } from './middlewere/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewere
app.use(express.json());

// Logger middlewere
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/tasks', routes);

// Home Page
app.get('/', (req, res) => {
  res.send('<h1> Matias Web Page </h1>')
});

// Error handler - always last
app.use(errorHandler); // trigger using next(err) or throw new Error()

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});