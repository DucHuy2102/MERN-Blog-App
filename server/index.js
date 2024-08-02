import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('\n--> Connected to MongoDB!');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(3000, () => {
    console.log('\n--> Server is running on port 3000!');
});
