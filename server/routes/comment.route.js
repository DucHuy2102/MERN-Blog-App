import express from 'express';
import {
    createComment,
    getAllComments,
    likeComment,
    editComment,
    deleteCommmet,
} from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// create a new comment
router.post('/create-comment', verifyUser, createComment);

// get all comments
router.get('/get-all-comments/:postId', getAllComments);

// like a comment
router.put('/like-comment/:commentId', verifyUser, likeComment);

// edit a comment
router.put('/edit-comment/:commentId', verifyUser, editComment);

// delete a comment
router.delete('/delete-comment/:commentId', verifyUser, deleteCommmet);

export default router;
