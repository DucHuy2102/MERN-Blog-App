import { Link } from 'react-router-dom';
import { CallToAction_Component, PostCard_Component } from '../components/exportComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            const res = await axios.get('/api/post/get-posts');
            if (res?.status === 200) {
                setPosts(res.data.posts);
            }
        };

        getAllPosts();
    }, []);

    return (
        <>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
                <h1 className='text-3xl font-bold lg:text-6xl'>
                    Welcome to my{' '}
                    <span className='text-transparent bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 bg-clip-text'>
                        Blog
                    </span>
                </h1>
                <p className='text-gray-500 text-sm sm:text-lg'>
                    Explore articles and tutorials on web development, programming, and modern
                    app-building techniques. Whether you&apos;re just starting out or looking to
                    level up your skills, our content is here to guide you.
                </p>
                <Link
                    to='/search'
                    className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
                >
                    View all posts
                </Link>
            </div>
            <div className='p-3 bg-amber-100 dark:bg-slate-700'>
                <CallToAction_Component />
            </div>

            <div className='w-full mx-auto p-3 flex flex-col gap-8 py-7'>
                {posts?.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                        <div className='flex flex-wrap justify-center gap-4'>
                            {posts.map((post) => (
                                <PostCard_Component key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={'/search'}
                            className='text-lg text-teal-500 hover:underline text-center'
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
