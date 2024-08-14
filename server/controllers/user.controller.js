import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { handleError } from '../utils/handleError.js';

// Update user
export const updateUSer = async (req, res, next) => {
    if (req.user.id !== req.params.userID) {
        return next(handleError(403, 'You are not authorized to perform this action'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(handleError(400, 'Password must be at least 6 characters long'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(handleError(400, 'Username must be between 7 and 20 characters long'));
        }
        if (req.body.username.includes(' ')) {
            return next(handleError(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(handleError(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-z0-9]+$/)) {
            return next(
                handleError(400, 'Username can only contain lowercase letters and numbers')
            );
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userID,
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(handleError(500, 'Internal server error'));
    }
};

// Delete user
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userID) {
        return next(handleError(403, 'You are not authorized to perform this action'));
    }

    try {
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(handleError(500, 'Internal server error'));
    }
};
