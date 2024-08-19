import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    console.log(user);
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
                <p className='dark:text-gray-200 pb-2'>{comment.content}</p>
            </div>
        </div>
    );
}
