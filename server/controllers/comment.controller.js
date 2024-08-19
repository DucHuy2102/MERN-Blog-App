import { handleError } from '../utils/handleError.js';
import Comment from '../models/comment.model.js';

// create a new comment
export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;
        if (userId !== req.user.id) {
            return next(handleError(401, 'You are not allowed to perform this action'));
        }
        const newComment = new Comment({ content, postId, userId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        next(handleError(500, error.message));
    }
};
