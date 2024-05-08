import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/crud');

mongoose.connection.once('open', () => {
  console.log('Database is connected');
});

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
