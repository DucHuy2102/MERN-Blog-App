import jwt from 'jsonwebtoken';
import { handleError } from './handleError.js';

export const verifyUser = (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(handleError(401, 'Unauthorized'));
    }
    jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(handleError(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
};
