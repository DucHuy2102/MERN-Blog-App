import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className='min-h-screen flex items-center justify-center font-serif'>
            <div className='max-w-3xl mx-auto p-3 text-center'>
                <h1 className='text-4xl font font-semibold text-center my-7'>
                    Discover More About{' '}
                    <span className='text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-green-500 hover:to-teal-600 hover:bg-clip-text'>
                        <Link to={'/'}>dHuy</Link>
                    </span>
                    &apos; Blog
                </h1>
                <div className='text-lg text-gray-500 flex flex-col gap-6'>
                    <p>
                        Welcome to{' '}
                        <span className='text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-green-500 hover:to-teal-600 hover:bg-clip-text'>
                            <Link to={'/'}>dHuy</Link>
                        </span>
                        &apos;s Blog! This space is a reflection of Duc Huy&apos;s passion for
                        technology and programming. It is a platform where I share my insights,
                        experiences, and knowledge with a global audience.
                    </p>

                    <p>
                        Here, you will find meticulously crafted articles and tutorials on web
                        development, software engineering, and the latest trends in programming
                        languages. My goal is to provide valuable content that not only educates but
                        also inspires developers at all levels.
                    </p>

                    <p>
                        I invite you to be an active part of this community. Your comments and
                        interactions enrich the content and create a dynamic learning environment
                        where everyone can grow. Feel free to like, reply, and engage with the
                        content and other readers.
                    </p>

                    <p>
                        Thank you for visiting, and I look forward to connecting with you through
                        this platform.
                    </p>

                    <p className='italic font-semibold'>
                        Let&apos;s learn, share, and grow together!
                    </p>
                    <p className='dark:text-white mt-4 text-right text-xl font-signature'>
                        Duc Huy
                    </p>
                </div>
            </div>
        </div>
    );
}
