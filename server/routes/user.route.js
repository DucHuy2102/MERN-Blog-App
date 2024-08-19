import express from 'express';
import {
    deleteUser,
    updateUSer,
    getAllUsers,
    getUserByID,
} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

// Update user
router.put('/update/:userID', verifyUser, updateUSer);

// Delete user by ID
router.delete('/delete/:userID', verifyUser, deleteUser);

// get all users
router.get('/get-all-users', verifyUser, getAllUsers);

// get user by ID
router.get('/:userID', getUserByID);

export default router;
