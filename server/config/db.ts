import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Connect to the database  
    const conn : any = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error : any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 indicates failure and 0 indicates success 
  }    }