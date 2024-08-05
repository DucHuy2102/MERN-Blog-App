import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
    const pathURL = useLocation().pathname;

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

            {/* search */}
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button
                className='w-12 h-10 lg:hidden flex items-center justify-center'
                color='gray'
                pill
            >
                <AiOutlineSearch size={18} />
            </Button>

            {/* button change theme & sign-in */}
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to='/sign-in' className='ml-2'>
                    <Button gradientDuoTone='purpleToBlue' pill outline>
                        Sign In
                    </Button>
                </Link>
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
        </Navbar>
    );
}
