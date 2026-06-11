import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to octofit_db via mongoose');
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to octofit_db:', error);
    throw error;
  }
}

export default {
  mongoUri,
  connectDatabase,
};
