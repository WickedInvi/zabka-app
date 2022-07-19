import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('db success connect');
  } catch (err) {
    console.log('error connecting to database');
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
