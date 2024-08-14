import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar_Component from '../components/Sidebar_Component';
import Profile_Component from '../components/Profile_Component';

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

            {/* profile */}
            {tab === 'profile' && <Profile_Component />}
        </div>
    );
}
