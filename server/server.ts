import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});



app.listen(process.env.PORT, () => {
    connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
