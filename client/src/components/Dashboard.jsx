import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    HiAnnotation,
    HiArrowNarrowDown,
    HiArrowNarrowUp,
    HiDocumentText,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const currentUser = useSelector((state) => state.user.currentUser);

    // state variables
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [total_User_LastMonth, set_Total_User_LastMonth] = useState(0);
    const [total_Posts_LastMonth, set_Total_Posts_LastMonth] = useState(0);
    const [total_Comments_LastMonth, set_Total_Comments_LastMonth] = useState(0);

    // get data from API
    useEffect(() => {
        // get all users
        const getUsers = async () => {
            try {
                const res = await axios.get('/api/user/get-all-users?limit=5');
                if (res.status === 200) {
                    setUsers(res.data.usersWithoutPassword);
                    setTotalUser(res.data.totalUsers);
                    set_Total_User_LastMonth(res.data.userLastMonth);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // get all posts
        const getPosts = async () => {
            try {
                const res = await axios.get(`/api/post/get-posts?limit=5`);
                if (res.status === 200) {
                    setPosts(res.data.posts);
                    setTotalPosts(res.data.totalPosts);
                    set_Total_Posts_LastMonth(res.data.postsLastMonth);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // get all comments
        const getComments = async () => {
            try {
                const res = await axios.get(`/api/comment/getAll-comments?limit=5`);
                if (res.status === 200) {
                    console.log(res.data);
                    setComments(res.data.comments);
                    setTotalComments(res.data.totalComments);
                    set_Total_Comments_LastMonth(res.data.commentsLastMonth);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            getUsers();
            getPosts();
            getComments();
        }
    }, [currentUser]);

    return (
        <div className='p-3 md:mx-auto'>
            {/* top section */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {/* users */}
                <div className='flex flex-col px-5 py-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='uppercase text-gray-500 font-medium'>total users</h3>
                            <p className='text-2xl'>{totalUser}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <div className='text-gray-500'>Last Month - </div>
                        <span className='flex items-center text-gray-500'>
                            {total_User_LastMonth} {total_User_LastMonth > 1 ? 'users' : 'user'}
                        </span>
                        {totalUser !== total_User_LastMonth && (
                            <span
                                className={`flex justify-center items-center ${
                                    totalUser > total_Comments_LastMonth
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {totalUser > total_User_LastMonth ? (
                                    <HiArrowNarrowUp />
                                ) : (
                                    <HiArrowNarrowDown />
                                )}
                                <span>{totalUser - total_User_LastMonth}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* posts */}
                <div className='flex flex-col px-5 py-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='uppercase text-gray-500 font-medium'>total posts</h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <div className='text-gray-500'>Last Month - </div>
                        <span className='flex items-center text-gray-500'>
                            {total_Posts_LastMonth} {total_Posts_LastMonth > 1 ? 'posts' : 'post'}
                        </span>
                        {totalPosts !== total_Posts_LastMonth && (
                            <span
                                className={`flex justify-center items-center ${
                                    totalPosts > total_Posts_LastMonth
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {totalPosts > total_Posts_LastMonth ? (
                                    <HiArrowNarrowUp />
                                ) : (
                                    <HiArrowNarrowDown />
                                )}
                                <span>{totalPosts - total_Posts_LastMonth}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* comments */}
                <div className='flex flex-col px-5 py-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='uppercase text-gray-500 font-medium'>total comments</h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <div className='text-gray-500'>Last Month - </div>
                        <span className='flex items-center text-gray-500'>
                            {total_Comments_LastMonth}{' '}
                            {total_Comments_LastMonth > 1 ? 'comments' : 'comment'}
                        </span>
                        {totalComments !== total_Comments_LastMonth && (
                            <span
                                className={`flex justify-center items-center ${
                                    totalComments > total_Comments_LastMonth
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {totalComments > total_Comments_LastMonth ? (
                                    <HiArrowNarrowUp />
                                ) : (
                                    <HiArrowNarrowDown />
                                )}
                                <span>{totalComments - total_Comments_LastMonth}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* middle section */}
            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                {/* users */}
                <div className='flex flex-col w-full md:w-auto shadow-md dark:bg-gray-800 p-2 rounded-md'>
                    <div className='flex justify-between px-5 py-3 text-sm font-semibold'>
                        <h1 className='p-2 text-center font-bold'>Recent Users</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=users'>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head align='center'>
                            <Table.HeadCell>avatar</Table.HeadCell>
                            <Table.HeadCell>username</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body align='center' key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={user.avatar}
                                            alt='user'
                                            className='w-10 h-10 rounded-full bg-gray-500'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>

                {/* comments */}
                <div className='flex flex-col w-full md:w-auto shadow-md dark:bg-gray-800 p-2 rounded-md'>
                    <div className='flex justify-between px-5 py-3 text-sm font-semibold'>
                        <h1 className='p-2 text-center font-bold'>Recent Posts</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=posts'>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head align='center'>
                            <Table.HeadCell>Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments &&
                            comments.map((comment) => (
                                <Table.Body align='center' key={comment._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell className='w-96'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </Table.Cell>
                                        <Table.Cell>{comment.numberLike}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>

                {/* posts */}
                <div className='flex flex-col w-full md:w-auto shadow-md dark:bg-gray-800 p-2 rounded-md'>
                    <div className='flex justify-between px-5 py-3 text-sm font-semibold'>
                        <h1 className='p-2 text-center font-bold'>Recent Users</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=users'>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head align='center'>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts.map((post) => (
                            <Table.Body align='center' key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={post.image}
                                            alt='user'
                                            className='w-14 h-10 rounded-md object-cover bg-gray-500'
                                        />
                                    </Table.Cell>
                                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    );
}
