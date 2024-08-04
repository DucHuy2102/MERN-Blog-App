import express from 'express';
import { testUserRoute } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', testUserRoute);

export default router;
