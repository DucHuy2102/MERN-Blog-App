import { handleError } from '../utils/handleError.js';
import Comment from '../models/comment.model.js';
import mongoose from 'mongoose';

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

// get all comments
export const getAllComments = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(handleError(401, 'You are not allowed to perform this action'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const comments = await Comment.find()
            .sort({ createdAt: sort })
            .skip(startIndex)
            .limit(limit)
            .populate('userId')
            .populate('postId');

        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const commentsLastMonth = await Comment.countDocuments({
            createdAt: { $gte: lastMonth },
        });
        res.status(200).json({ comments, totalComments, commentsLastMonth });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// get all comments for a post by postId
export const getAllComments_ByPostId = async (req, res, next) => {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(handleError(400, 'Invalid Post ID'));
    }
    const objectId = new mongoose.Types.ObjectId(postId);

    try {
        const comments = await Comment.find({
            postId: objectId,
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

// edit a comment
export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(handleError(404, 'Comment not found'));
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(handleError(401, 'You are not allowed to perform this action'));
        }
        const editComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true }
        );
        res.status(200).json(editComment);
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// delete a comment
export const deleteCommmet = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(handleError(404, 'Comment not found'));
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(handleError(401, 'You are not allowed to perform this action'));
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
