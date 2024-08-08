import { Sidebar } from 'flowbite-react';
import { HiArrowSmDown, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar_Component() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabURL = urlParams.get('tab');
        setTab(tabURL);
    }, [location.search]);

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
                    <Sidebar.Item icon={HiArrowSmDown} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
