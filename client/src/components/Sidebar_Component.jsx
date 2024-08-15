import { Sidebar } from 'flowbite-react';
import { HiArrowSmDown, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { user_SignOut } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function Sidebar_Component() {
    const dispatch = useDispatch();
    const [uploadFailed, setUploadError] = useState(null);

    // get tab from url
    const location = useLocation();
    const [tab, setTab] = useState('');
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
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={'User'}
                        labelColor='dark'
                    >
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item
                        icon={HiArrowSmDown}
                        className='cursor-pointer'
                        onClick={handleSignOutAccount}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
