import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

// sign up
router.post('/sign-up', signUp);

// sign in
router.post('/sign-in', signIn);

export default router;
