import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComment() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentDelete, setCommentDelete] = useState('');

    // get all comments
    useEffect(() => {
        const getAllComments = async () => {
            try {
                const res = await axios.get(`/api/comment/getAll-comments`);
                if (res.status === 200) {
                    const commentData = res.data.comments;
                    setComments(commentData);
                    if (commentData?.length < 10) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            getAllComments();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    // Show more comments function
    const handleShowMoreComment = async () => {
        const startIndex = comments.length;
        try {
            const res = await axios.get(`/api/comment/getAll-comments`);
            if (res.status === 200) {
                const commentData = res.data.comments;
                setComments([...comments, ...commentData]);
                if (commentData.length < 9) {
                    setShowMore(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete comment function
    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const res = await axios.delete(`/api/comment/delete-comment/${commentDelete}`);
            if (res.status === 200) {
                const usersData = comments.filter((user) => user._id !== commentDelete);
                setComments(usersData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'
        >
            {currentUser.isAdmin && comments?.length > 0 ? (
                <>
                    {/* table display all post */}
                    <Table hoverable className='shadow-md'>
                        <Table.Head align='center'>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Number of likes</Table.HeadCell>
                            <Table.HeadCell>PostId</Table.HeadCell>
                            <Table.HeadCell>UserId</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {comments?.map((comment) => (
                            <Table.Body align='center' key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:bg-gray-900 dark:border-gray-800'>
                                    <Table.Cell>
                                        {new Date(comment.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>{comment.content}</Table.Cell>
                                    <Table.Cell>{comment.numberLike}</Table.Cell>
                                    <Table.Cell>{comment.postId.title}</Table.Cell>
                                    <Table.Cell>{comment.userId.username}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setCommentDelete(comment._id);
                                                setShowModal(true);
                                            }}
                                            className='text-red-500 hover:underline cursor-pointer font-medium'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>

                    {/* button show more post */}
                    {showMore && (
                        <div className='mt-5 mb-3 w-full flex justify-center items-center'>
                            <button
                                onClick={handleShowMoreComment}
                                className='w-40 text-teal-500 hover:bg-teal-500 hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition duration-200 text-md py-2 rounded-lg border border-teal-500'
                            >
                                Show more
                            </button>
                        </div>
                    )}

                    {/* show modal to confirm delete post */}
                    {showModal && (
                        <Modal show={showModal} onClose={() => setShowModal(false)} size='md' popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className='text-center'>
                                    <HiOutlineExclamationCircle className='text-red-500 text-5xl mx-auto' />
                                    <span className='text-lg font-medium text-black'>
                                        This action cannot be undone. Do you want to delete this
                                        comment?
                                    </span>
                                    <div className='flex justify-between items-center mt-5'>
                                        <Button color='gray' onClick={() => setShowModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button color='failure' onClick={handleDeleteComment}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            ) : (
                <p>You have no comments!</p>
            )}
        </div>
    );
}
