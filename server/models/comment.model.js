import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        like: {
            type: Array,
            default: [],
        },
        numberLike: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
