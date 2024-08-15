import Post from '../models/post.modal.js';
import { handleError } from '../utils/handleError.js';

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(handleError(403, 'You are not authorized to create a post'));
    }
    if (!req.body.title || !req.body.content) {
        return next(handleError(401, 'Please provide all required fields'));
    }
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userID: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(handleError(500, error.message));
    }
};
