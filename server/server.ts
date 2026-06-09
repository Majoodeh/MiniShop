import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routes.js';

// to load environment variables from a .env file into process.env,
//  making them accessible throughout the application.
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// middleware to handle requests to the /api/products endpoint.
app.use('/api/products', productRouter);
const PORT = process.env.PORT || 5000;



// Function to start the server after connecting to the database
const startServer = async () => {
  try {
    // Connect to the database before starting the server
    await connectDB();

    // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  } 






  catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  }

};

startServer();