import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Dashboard_Component,
    DashComment_Component,
    DashPosts_Component,
    DashUsers_Component,
    Profile_Component,
    Sidebar_Component,
} from '../components/exportComponent';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabURL = urlParams.get('tab');
        setTab(tabURL);
    }, [location.search]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* sidebar */}
            <div className='md:w-56'>
                <Sidebar_Component />
            </div>

            {/* dashboard */}
            {tab === 'dashboard' && <Dashboard_Component />}

            {/* profile */}
            {tab === 'profile' && <Profile_Component />}

            {/* posts */}
            {tab === 'posts' && <DashPosts_Component />}

            {/* users */}
            {tab === 'users' && <DashUsers_Component />}

            {/* comments */}
            {tab === 'comments' && <DashComment_Component />}
        </div>
    );
}
