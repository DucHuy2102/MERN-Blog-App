import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, getPosts, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

// create a new post
router.post('/create-post', verifyUser, createPost);

// get all posts
router.get('/get-posts', getPosts);

// delete a post by ID and adminId
router.delete('/delete-post/:postID/:userID', verifyUser, deletePost);

export default router;
