import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routs.js';

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
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
