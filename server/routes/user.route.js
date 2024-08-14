import express from 'express';
import { deleteUser, updateUSer } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Update user
router.put('/update/:userID', verifyUser, updateUSer);

// Delete user
router.delete('/delete/:userID', verifyUser, deleteUser);

export default router;
