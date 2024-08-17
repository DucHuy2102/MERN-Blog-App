import express from 'express';
import { deleteUser, updateUSer, getAllUsers } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Update user
router.put('/update/:userID', verifyUser, updateUSer);

// Delete user
router.delete('/delete/:userID', verifyUser, deleteUser);

// get all users
router.get('/get-all-users', verifyUser, getAllUsers);

export default router;
