import mongoose from 'mongoose';
import dotenv from 'dotenv';


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected');
    //console.log('Database name:', mongoose.connection.db.databaseName);
    //console.log('Collections name:', mongoose.connection.db.listCollections().toArray());
    //console.log('Host:', mongoose.connection.host);
    //console.log('Port:', mongoose.connection.port);

  } catch (e) {
    console.error('MongoDB Connection error', err.message);
    process.exit(1);
  }
}


export default connectDB;