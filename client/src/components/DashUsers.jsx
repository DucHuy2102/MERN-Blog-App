import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userDelete, setUserDelete] = useState('');

    // get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/user/get-all-users');
                if (res.status === 200) {
                    const usersData = res.data.usersWithoutPassword;
                    setUsers(usersData);
                    if (usersData.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    // Show more posts function
    const handleShowMorePost = async () => {
        const startIndex = users.length;
        try {
            const res = await axios.get(`/api/user/get-all-users?startIndex=${startIndex}`);
            if (res.status === 200) {
                const usersData = res.data.usersWithoutPassword;
                setUsers([...users, ...usersData]);
                if (usersData.length < 9) {
                    setShowMore(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete post function
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            const res = await axios.delete(`/api/user/delete/${userDelete}`);
            if (res.status === 200) {
                const usersData = users.filter((user) => user._id !== userDelete);
                setUsers(usersData);
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
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    {/* table display all post */}
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Delete</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:bg-gray-900 dark:border-gray-800'>
                                    <Table.Cell>
                                        {new Date(user.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/posts/${user.slug}`}>
                                            <img
                                                src={user.avatar}
                                                alt='post'
                                                className='w-20 h-20 object-cover bg-gray-500 rounded-full'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        {user.isAdmin ? (
                                            <FaCheck className='text-green-500' />
                                        ) : (
                                            <FaTimes className='text-red-500' />
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setUserDelete(user._id);
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
                                        This action cannot be undone. Do you want to delete this
                                        user?
                                    </span>
                                    <div className='flex justify-between items-center mt-5'>
                                        <Button color='gray' onClick={() => setShowModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button color='failure' onClick={handleDeleteUser}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            ) : (
                <p>You have no users!</p>
            )}
        </div>
    );
}
