import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 3,
    unique: true
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 3

  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  }
}, { strict: 'throw' });

export default mongoose.model('User', userSchema);
