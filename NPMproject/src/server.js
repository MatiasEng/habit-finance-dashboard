// server.js
import express from 'express';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewere
app.use(express.json());

const URL = 'https://jsonplaceholder.typicode.com'

app.get('/', (req, res) => {
  res.send('My WebPage');
})

app.get(`/posts`, async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error('External Error');
    }

    const posts = await response.json();
    res.json(posts); // send has response 


  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: 'Failed'});
  }
})


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});