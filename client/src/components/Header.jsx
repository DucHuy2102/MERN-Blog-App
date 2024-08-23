import { Alert, Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import axios from 'axios';
import { user_SignOut } from '../redux/slices/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
    const dispatch = useDispatch();
    const pathURL = useLocation().pathname;
    const currentUser = useSelector((state) => state.user.currentUser);
    const theme = useSelector((state) => state.theme.theme);
    const [uploadFailed, setUploadError] = useState(null);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    // get search term from url params
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchURL = urlParams.get('searchTerm');
        setSearchTerm(searchURL ?? '');
    }, [location.search]);

    // handle submit search form
    const handleSubmit = () => {
        if (searchTerm.trim() === '') {
            return;
        }
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const newSearchTerm = urlParams.toString();
        navigate(`/search?${newSearchTerm}`);
    };

    return (
        <Navbar className='border-b-2'>
            {/* name app */}
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='bg-gradient-to-r from-[#D16BA5] via-[#86A8E7] to-[#44cdc4] px-2 py-1 rounded-lg text-white'>
                    dHuy&apos;s
                </span>
                Blog
            </Link>

            {/* search form */}
            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='w-40 inline-block sm:w-72'
                    value={searchTerm ?? ''}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            {/* button change theme & sign-in */}
            <div className='flex gap-2 md:order-2'>
                <Button
                    onClick={() => dispatch(toggleTheme())}
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill
                >
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar alt='Avatar_User' img={currentUser.avatar} rounded />}
                    >
                        <Dropdown.Header>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOutAccount}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in' className='ml-2'>
                        <Button gradientDuoTone='purpleToBlue' pill outline>
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>

            {/* menu */}
            <Navbar.Collapse>
                <Navbar.Link active={pathURL === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={pathURL === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={pathURL === '/projects'} as={'div'}>
                    <Link to='/projects'>Project</Link>
                </Navbar.Link>
            </Navbar.Collapse>

            {/* show error when sign out failed */}
            {uploadFailed && (
                <Alert
                    color='failure'
                    className='w-full font-semibold flex justify-center items-center'
                >
                    {uploadFailed}
                </Alert>
            )}
        </Navbar>
    );
}
