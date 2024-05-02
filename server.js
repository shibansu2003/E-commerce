import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

// Database configuration
connectDB().then(() => {
    const app = express();
});

// Middleware setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(new URL('./client/build', import.meta.url).pathname));

// Routes setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Default route
app.use('*', (req, res) => {
    res.sendFile(path.join(new URL('./client/build/index.html', import.meta.url).pathname));
});

// Define port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
});
