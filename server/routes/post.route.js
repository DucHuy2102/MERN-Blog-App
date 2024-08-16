import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

// create a new post
router.post('/create-post', verifyUser, createPost);

// get all posts
router.get('/get-posts', getPosts);

export default router;
