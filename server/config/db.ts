import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Check if the MONGO_URI environment variable is defined.
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI environment variable is not defined');

    // Connect to the database
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred while connecting to the database.');
    }
    process.exit(1); // 1 indicates failure and 0 indicates success
  }
};
