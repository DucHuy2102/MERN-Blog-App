import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub, BsQuora } from 'react-icons/bs';

export default function Footer_Component() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                {/* top */}
                <div className='w-full sm:flex sm:gap-10 sm:justify-between'>
                    {/* name */}
                    <div className='mt-5'>
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='bg-gradient-to-r from-[#D16BA5] via-[#86A8E7] to-[#44cdc4] px-2 py-1 rounded-lg text-white'>
                                dHuy&apos;s
                            </span>
                            Blog
                        </Link>
                    </div>

                    {/* menu */}
                    <div className='grid grid-cols-3 gap-7 mt-5 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:mt-0'>
                        {/* more project */}
                        <div>
                            <Footer.Title title='more Project' />
                            <Footer.LinkGroup>
                                <Footer.Link
                                    href='https://github.com/DucHuy2102/Watches_Store.git'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Watches Store
                                </Footer.Link>
                                <Footer.Link
                                    href='https://github.com/DucHuy2102/Youtube-Clone-Vite.git'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Youtube Clone
                                </Footer.Link>
                                <Footer.Link
                                    href='https://github.com/DucHuy2102/chat-app-firebase.git'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Chat Application
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        {/* follow us */}
                        <div>
                            <Footer.Title title='follow us' />
                            <Footer.LinkGroup>
                                <Footer.Link
                                    href='https://github.com/DucHuy2102'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.facebook.com/Duc.Huy2102'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.linkedin.com/in/duchuy2102/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Linkedin
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        {/* legal */}
                        <div>
                            <Footer.Title title='legal' />
                            <Footer.LinkGroup>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>

                {/* divide */}
                <Footer.Divider />

                {/* bottom */}
                <div className='w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between'>
                    <Footer.Copyright
                        className='font-medium sm:font-bold'
                        href='#'
                        by="DucHuy's Blog"
                        year={new Date().getFullYear()}
                    />
                    <div className='flex gap-6 items-center sm:justify-center sm:mt-3 mt-4'>
                        <Footer.Icon
                            href='https://www.facebook.com/Duc.Huy2102/'
                            icon={BsFacebook}
                        />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon
                            href='https://www.linkedin.com/in/duchuy2102/'
                            icon={BsLinkedin}
                        />
                        <Footer.Icon
                            href='https://github.com/DucHuy2102?tab=repositories'
                            icon={BsGithub}
                        />
                        <Footer.Icon href='#' icon={BsQuora} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
// w-full sm:flex sm:items-center sm:justify-between
