import Post from '../models/post.model.js';
import { handleError } from '../utils/handleError.js';

// create a new post
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

// get all posts
export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userID && { userID: req.query.userID }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sort })
            .skip(startIndex)
            .limit(limit);
        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const postsLastMonth = await Post.countDocuments({
            createdAt: { $gte: lastMonth },
        });

        res.status(200).json({ posts, totalPosts, postsLastMonth });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// delete a post by id and userID
export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userID) {
        return next(handleError(403, 'You are not authorized to delete this post'));
    }
    console.log(req.params);
    try {
        await Post.findByIdAndDelete(req.params.postID);
        res.status(204).json('Post has been deleted');
    } catch (error) {
        next(handleError(500, error.message));
    }
};

// update a post by id and userID
export const updatePost = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.body.userID) {
        return next(handleError(403, 'You are not authorized to update this post'));
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postID,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(handleError(500, error.message));
    }
};
