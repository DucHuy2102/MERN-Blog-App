import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

export default function Comment({ postId }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);

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
