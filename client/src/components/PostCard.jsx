import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className='group relative h-[350px] w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[430px] hover:border-2 transition-all duration-200'>
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt={post.title}
                    className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
                <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
                <span className='italic text-sm'>{post.category}</span>
                <Link
                    to={`/post/${post.slug}`}
                    className='z-10 absolute group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-lg rounded-tl-none rounded-tr-none m-2'
                >
                    <button>Read More</button>
                </Link>
            </div>
        </div>
    );
}
