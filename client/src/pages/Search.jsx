import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard_Component } from '../components/exportComponent';

export default function Search() {
    const [advanceSearch, setAdvancedSearch] = useState({
        searchTerm: '',
        sort: 'desc',
        category: '',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // get search term from url params
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchURL = urlParams.get('searchTerm') || '';
        const sortURL = urlParams.get('sort') || 'desc';
        const categoryURL = urlParams.get('category') || '';
        const startIndex = 0;
        const limit = 9;
        if (searchURL || sortURL || categoryURL) {
            setAdvancedSearch({
                searchTerm: searchURL,
                sort: sortURL,
                category: categoryURL,
            });
        }

        // get all posts
        const getAllPosts = async () => {
            setLoading(true);
            try {
                urlParams.set('startIndex', startIndex);
                urlParams.set('limit', limit);
                const newSearchTerm = urlParams.toString();
                const res = await axios.get(`/api/post/get-posts?${newSearchTerm}`);
                if (res?.status === 200) {
                    const postData = res.data.posts;
                    setPosts(postData);
                    if (postData.length === limit) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAllPosts();
    }, [location.search]);

    // handle input change
    const handleChangeInput = (e) => {
        const { id, value } = e.target;
        setAdvancedSearch((prev) => ({
            ...prev,
            [id]: value ?? prev[id],
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', advanceSearch.searchTerm);
        urlParams.set('sort', advanceSearch.sort);
        urlParams.set('category', advanceSearch.category);
        const newSearchTerm = urlParams.toString();
        navigate(`/search?${newSearchTerm}`);
    };

    // handle show more
    const handleShowMore = async () => {
        setLoading(true);
        try {
            const numberOfPosts = posts.length;
            const startIndex = numberOfPosts;
            const limit = 9;
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startIndex', startIndex);
            urlParams.set('limit', limit);
            const newSearchParams = urlParams.toString();
            const res = await axios.get(`/api/post/get-posts?${newSearchParams}`);
            if (res?.status === 200) {
                const postData = res.data.posts;
                setPosts([...posts, ...postData]);
                if (postData.length < limit) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row'>
            {/* menu filter */}
            <div className='p-7 sm:border-r sm:min-h-screen border-gray-500'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <TextInput
                            placeholder='Search...'
                            type='text'
                            id='searchTerm'
                            value={advanceSearch.searchTerm}
                            onChange={handleChangeInput}
                        />
                    </div>{' '}
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Sort:</label>
                        <Select onChange={handleChangeInput} value={advanceSearch.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>{' '}
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Category:</label>
                        <Select
                            onChange={handleChangeInput}
                            value={advanceSearch.category}
                            id='category'
                        >
                            <option value=''>Select Category</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='react'>React</option>
                            <option value='java'>Java</option>
                            <option value='mongodb'>MongoDB</option>
                            <option value='python'>Python</option>
                            <option value='uncategorized'>Uncategorized</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink' className='mt-5'>
                        Search
                    </Button>
                </form>
            </div>

            {/* posts */}
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
                    Posts results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    {!loading &&
                        posts?.map((post) => <PostCard_Component key={post._id} post={post} />)}
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
