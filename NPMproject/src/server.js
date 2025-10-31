// server.js
import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewere
app.use(express.json());


// Routes
app.use('/api/tasks', routes);

// Home Page

app.get('/', (req, res) => {
  res.send('<h1> Matias Web Page </h1>')
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});