import { Sidebar } from 'flowbite-react';
import {
    HiAnnotation,
    HiArrowSmDown,
    HiChartPie,
    HiDocumentText,
    HiOutlineUserGroup,
    HiUser,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { user_SignOut } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar_Component() {
    const dispatch = useDispatch();
    const [uploadFailed, setUploadError] = useState(null);
    const isAdmin = useSelector((state) => state.user.currentUser.isAdmin);

    // get tab from url
    const location = useLocation();
    const [tab, setTab] = useState('profile');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabURL = urlParams.get('tab');
        setTab(tabURL);
    }, [location.search]);

    // sign out function
    const handleSignOutAccount = async () => {
        try {
            const res = await axios.post('/api/auth/sign-out');
            if (res?.status === 200) {
                dispatch(user_SignOut());
            }
        } catch (error) {
            setUploadError('An unexpected error occurred');
            console.log(error);
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1 justify-center'>
                    {isAdmin && (
                        <Sidebar.Item
                            as={Link}
                            to='/dashboard?tab=dashboard'
                            active={tab === 'dashboard'}
                            icon={HiChartPie}
                            className={`${tab === 'dashboard' ? 'bg-gray-400 text-black' : ''}`}
                        >
                            Dashboard
                        </Sidebar.Item>
                    )}

                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={isAdmin ? 'Admin' : 'User'}
                        labelColor='dark'
                        className={`${tab === 'profile' ? 'bg-gray-400 text-black' : ''}`}
                    >
                        Profile
                    </Sidebar.Item>

                    {/* items for admin */}
                    {isAdmin && (
                        <>
                            <Sidebar.Item
                                as={Link}
                                to='/dashboard?tab=posts'
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                className={`${tab === 'posts' ? 'bg-gray-400 text-black' : ''}`}
                            >
                                Posts
                            </Sidebar.Item>
                            <Sidebar.Item
                                as={Link}
                                to='/dashboard?tab=users'
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                                className={`${tab === 'users' ? 'bg-gray-400 text-black' : ''}`}
                            >
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item
                                as={Link}
                                to='/dashboard?tab=comments'
                                active={tab === 'comments'}
                                icon={HiAnnotation}
                                className={`${tab === 'comments' ? 'bg-gray-400 text-black' : ''}`}
                            >
                                Comments
                            </Sidebar.Item>
                        </>
                    )}

                    <Sidebar.Item
                        icon={HiArrowSmDown}
                        className={'cursor-pointer'}
                        onClick={handleSignOutAccount}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
