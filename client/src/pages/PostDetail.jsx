import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { CallToAction_Component, CommentSection_Component } from '../components/exportComponent';

export default function PostDetail() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const [postDetail, setPostDetail] = useState(null);

    // get post detail by slug
    useEffect(() => {
        const getPostDetail = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/post/get-posts?slug=${postSlug}`);
                if (res.status === 200) {
                    setPostDetail(res.data.posts[0]);
                    setLoading(false);
                    setErr(false);
                }
            } catch (error) {
                setLoading(false);
                setErr(true);
                console.log(error);
            }
        };

        getPostDetail();
    }, [postSlug]);

    // if loading is true, display a spinner
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Spinner size='xl' />
            </div>
        );
    }

    return (
        <main className='p-3 flex flex-col mx-auto min-h-screen w-full'>
            {/* title */}
            <h1 className='mt-10 text-3xl p-3 font-serif text-center mx-auto lg:text-4xl'>
                {postDetail?.title}
            </h1>

            {/* category */}
            <Link to={`/search?category=${postDetail?.category}`} className='self-center mt-5'>
                <Button pill color='gray' size='sm'>
                    {postDetail?.category}
                </Button>
            </Link>

            {/* image */}
            <img
                src={postDetail?.image}
                alt={postDetail?.title}
                className='w-full max-h-[65rem] mt-5 p-3 object-cover'
            />

            {/* date create post and time to read */}
            <div className='p-3 w-full mx-auto flex justify-between items-center border-b border-slate-500'>
                <p className='text-gray-500 text-md mt-1'>
                    {new Date(postDetail?.createdAt).toLocaleDateString()}
                </p>
                <p className='text-gray-500 text-md mt-1 italic'>
                    {(postDetail?.content.length / 1000).toFixed(0)} mins read
                </p>
            </div>

            {/* content */}
            <div
                className='w-full p-3 mx-auto post-content'
                dangerouslySetInnerHTML={{ __html: postDetail?.content }}
            />

            <div className='w-full p-3 mx-auto'>
                <CallToAction_Component />
            </div>
            <CommentSection_Component postId={postDetail._id} />
        </main>
    );
}
