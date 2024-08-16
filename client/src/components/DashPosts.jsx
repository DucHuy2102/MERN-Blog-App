import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postID, setPostID] = useState('');

    // get all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/api/post/get-posts?userID=${currentUser._id}`);
                if (res.status === 200) {
                    const postsData = res.data.posts;
                    setPosts(postsData);
                    if (postsData.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    // Show more posts function
    const handleShowMorePost = async () => {
        const startIndex = posts.length;
        try {
            const res = await axios.get(
                `/api/post/get-posts?userID=${currentUser._id}&startIndex=${startIndex}`
            );
            if (res.status === 200) {
                const postsData = res.data.posts;
                setPosts([...posts, ...postsData]);
                if (postsData.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete post function
    const handleDeleteAccount = async () => {
        setShowModal(false);
        try {
            const res = await axios.delete(`/api/post/delete-post/${postID}/${currentUser._id}`);
            if (res.status === 204) {
                const postsData = posts.filter((post) => post._id !== postID);
                setPosts(postsData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'
        >
            {currentUser.isAdmin && posts.length > 0 ? (
                <>
                    {/* table display all post */}
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {posts.map((post) => (
                            <Table.Body key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:bg-gray-900 dark:border-gray-800'>
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/posts/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt='post'
                                                className='w-20 h-20 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/posts/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true), setPostID(post._id);
                                            }}
                                            className='text-red-500 hover:underline cursor-pointer font-medium'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='text-teal-500 hover:underline cursor-pointer font-medium'
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>

                    {/* button show more post */}
                    {showMore && (
                        <div className='mt-5 mb-3 w-full flex justify-center items-center'>
                            <button
                                onClick={handleShowMorePost}
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
                                        This action cannot be undone. Do you want to proceed with
                                        deleting?
                                    </span>
                                    <div className='flex justify-between items-center mt-5'>
                                        <Button color='gray' onClick={() => setShowModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button color='failure' onClick={handleDeleteAccount}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            ) : (
                <p>You have no posts!</p>
            )}
        </div>
    );
}
