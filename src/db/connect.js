import mongoose from 'mongoose';
import dotenv from 'dotenv';


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected');

  } catch (e) {
    console.error('MongoDB Connection error', err.message);
    process.exit(1);
  }
}


export default connectDB;