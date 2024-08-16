import Post from '../models/post.modal.js';
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
    console.log(req.query);
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.perPage) || 9;
        const sort = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userID && [{ userID: req.query.userID }]),
            ...(req.query.category && [{ category: req.query.category }]),
            ...(req.query.slug && [{ slug: req.query.slug }]),
            ...(req.query.postID && [{ _id: req.query.postID }]),
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
