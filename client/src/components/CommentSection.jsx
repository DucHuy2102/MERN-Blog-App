import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Comment_Component } from './exportComponent';

export default function CommentSection({ postId }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [commentError, setCommentError] = useState(null);
    const navigate = useNavigate();

    // handle create comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment || comment.length > 500) {
            setCommentError('Comment must be between 1 and 500 characters');
            setTimeout(() => {
                setCommentError(null);
            }, 3000);
            return;
        }
        try {
            const res = await axios.post(`/api/comment/create-comment`, {
                content: comment,
                postId,
                userId: currentUser._id,
            });
            if (res?.status === 201) {
                setComment('');
                setCommentError(null);
                setAllComments([...allComments, res.data]);
                console.log(res.data);
            }
        } catch (error) {
            setCommentError('Something went wrong. Please try again later');
            setTimeout(() => {
                setCommentError(null);
            }, 3000);
            console.log(error);
        }
    };

    // handle get all comments
    useEffect(() => {
        const getAllComments = async () => {
            try {
                const res = await axios.get(`/api/comment/get-all-comments/${postId}`);
                if (res?.status === 200) {
                    setAllComments(res.data);
                    setCommentError(null);
                }
            } catch (error) {
                setCommentError('Something went wrong. Please try again later');
                console.log(error);
            }
        };

        getAllComments();
    }, [postId]);

    // handle like comment
    const handleLikeComment = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await axios.put(`/api/comment/like-comment/${commentId}`);
            if (res?.status === 200) {
                const updatedComments = allComments.map((comment) =>
                    comment._id === commentId
                        ? {
                              ...comment,
                              numberLike: res.data.like.length,
                              like: res.data.like,
                          }
                        : comment
                );
                setAllComments(updatedComments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle edit comment

    // handle delete comment

    return (
        <div className='w-full p-3 mx-auto'>
            {currentUser ? (
                // if user signed in
                <>
                    {/* sign in as username */}
                    <div className='flex justify-start items-center gap-1 my-2 text-gray-500'>
                        <p>Sign in as:</p>
                        <img
                            src={currentUser.avatar}
                            alt=''
                            className='h-6 w-6 object-cover rounded-full'
                        />
                        <Link
                            className='text-cyan-600 italic hover:underline'
                            to='/dashboard?tab=profile'
                        >
                            @{currentUser.username}
                        </Link>
                    </div>

                    {/* comment form */}
                    <form onSubmit={handleSubmit} className='border border-teal-500 p-3 rounded-lg'>
                        <Textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder='Add a comment...'
                            rows='3'
                            maxLength='500'
                        />
                        {/* show error when create comment failed */}
                        {commentError && (
                            <Alert
                                color='failure'
                                className='w-full mt-3 font-semibold flex justify-center items-center'
                            >
                                {commentError}
                            </Alert>
                        )}
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-sm'>
                                {500 - comment.length} characters remaining
                            </p>
                            <Button type='submit' outline gradientDuoTone='purpleToBlue'>
                                Comment
                            </Button>
                        </div>
                    </form>

                    {/* show all comments */}
                    {allComments.length > 0 ? (
                        <>
                            <div className='my-5 flex items-center gap-x-2'>
                                <div className='border border-teal-400 rounded-full px-2 flex items-center justify-center dark:bg-teal-500'>
                                    <p>{allComments.length}</p>
                                </div>
                                <p>Comments</p>
                            </div>
                            {allComments.map((comment) => (
                                <Comment_Component
                                    key={comment._id}
                                    comment={comment}
                                    onLike={handleLikeComment}
                                />
                            ))}
                        </>
                    ) : (
                        <p className='text-gray-500 text-sm mt-5 text-center font-bold'>
                            No comments yet!
                        </p>
                    )}
                </>
            ) : (
                // if user not signed in
                <div className='flex justify-start items-center gap-x-2 my-2 text-gray-500'>
                    You need to sign in to comment
                    <Link className='text-cyan-600 italic hover:underline' to='/sign-in'>
                        Sign in
                    </Link>
                </div>
            )}
        </div>
    );
}
