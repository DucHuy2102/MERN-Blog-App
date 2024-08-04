import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { handleError } from '../utils/handleError.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(handleError(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

export const signIn = (req, res) => {};
