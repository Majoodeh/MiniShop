import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI!);
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
