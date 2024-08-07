import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { handleError } from '../utils/handleError.js';
import jwt from 'jsonwebtoken';

// sign up
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
        if (error.code === 11000) {
            return next(handleError(400, 'Already have user in system'));
        }
        next(error);
    }
};

// sign in with email & password
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(handleError(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(handleError(400, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(handleError(400, 'Password is incorrect'));
        }
        const token = jwt.sign(
            {
                id: validUser._id,
            },
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validUser._doc;
        res.status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

// sign in with google
export const googleSignIn = async (req, res, next) => {
    const { name, email, photoURL } = req.body;
    try {
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            const token = jwt.sign({ id: isExistUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = isExistUser._doc;
            res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
                email,
                password: hashedPassword,
                avatar: photoURL,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = savedUser._doc;
            res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
