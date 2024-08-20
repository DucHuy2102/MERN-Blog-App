import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(comment.content);

    // get user info for each comment
    useEffect(() => {
        const getAllComments = async () => {
            try {
                const res = await axios.get(`/api/user/${comment.userId}`);
                if (res?.status === 200) {
                    setUser(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllComments();
    }, [comment]);

    // handle click edit
    const handleClickEdit = () => {
        setIsEditing(true);
        setNewContent(comment.content);
    };

    // handle save comment
    const handleSaveComment = async () => {
        try {
            // onEdit(comment, newContent);

            const res = await axios.put(`/api/comment/edit-comment/${comment._id}`, {
                content: newContent,
            });
            if (res?.status === 200) {
                onEdit(comment, newContent);
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex p-4 border-b dark:border-gray-600'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    src={user?.avatar}
                    className='w-10 h-10 rounded-full bg-gray-200'
                    alt={user?.username}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold text-sm mr-1 truncate'>
                        {`@${user?.username}` || 'Unknown User'}
                    </span>
                    <span className='text-gray-500 text-sm truncate'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                {!isEditing ? (
                    <>
                        <p className='dark:text-gray-200 pb-2'>{comment.content}</p>
                        <div className='flex items-center gap-x-2 pt-2 text-sm border-t dark:border-gray-500 max-w-fit'>
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={` hover:text-blue-500 ${
                                    currentUser && comment.like.includes(currentUser._id)
                                        ? 'text-blue-500'
                                        : 'text-gray-400'
                                }`}
                            >
                                <FaThumbsUp />
                            </button>
                            <p>
                                {comment?.numberLike > 0 &&
                                    `${comment.numberLike} ${
                                        comment.numberLike === 1 ? 'like' : 'likes'
                                    }`}
                            </p>
                            {currentUser?._id === comment.userId && (
                                <button
                                    type='button'
                                    onClick={handleClickEdit}
                                    className='hover:text-blue-500 text-gray-400 font-medium'
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Textarea
                            className='mb-1'
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <div className='flex gap-2 justify-end'>
                            <Button
                                onClick={() => setIsEditing(false)}
                                type='button'
                                size='sm'
                                outline
                                gradientDuoTone='purpleToBlue'
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveComment}
                                size='sm'
                                type='button'
                                gradientDuoTone='purpleToBlue'
                            >
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
