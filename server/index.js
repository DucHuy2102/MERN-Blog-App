import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const __dirname = path.resolve();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('\n--> Connected to MongoDB!');
    })
    .catch((err) => {
        console.error(err);
    });

// Start server
app.listen(3000, () => {
    console.log('\n--> Server is running on port 3000!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', 'dist', 'index.html'));
});

// Middleware for handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, statusCode, message });
});
