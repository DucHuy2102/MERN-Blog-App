import express from 'express';
import { updateUSer } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userID', verifyUser, updateUSer);

export default router;
