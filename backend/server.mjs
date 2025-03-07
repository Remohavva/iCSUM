import express, { Router } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/productModel.js';
import productRoutes from './routes/productroutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import artistRoutes from './routes/artistRoutes.js';

dotenv.config();

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Music Review API' });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/artists', artistRoutes);
app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`); // Fixed port number in console log
});