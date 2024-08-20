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

// get all comments for a post by postId
export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId,
        }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// like a comment
export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(handleError(404, 'Comment not found'));
        }
        const userIndex = comment.like.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.numberLike += 1;
            comment.like.push(req.user.id);
        } else {
            comment.numberLike -= 1;
            comment.like.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(handleError(500, error.message));
    }
};
