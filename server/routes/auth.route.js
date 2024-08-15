import express from 'express';
import { signOut, googleSignIn, signIn, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

// sign up
router.post('/sign-up', signUp);

// sign in with email & password
router.post('/sign-in', signIn);

// sign in with google
router.post('/google-sign-in', googleSignIn);

// sign out
router.post('/sign-out', signOut);

export default router;
