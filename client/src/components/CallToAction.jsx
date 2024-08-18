import { Button } from 'flowbite-react';

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
            <div className='flex flex-col flex-1 justify-center items-center font-serif'>
                <h2 className='text-2xl font-medium'>Want to see more amazing project?</h2>
                <p className='text-gray-500 my-2 italic'>
                    Connect my{' '}
                    <a
                        className='text-teal-500 hover:underline'
                        href='https://www.linkedin.com/in/duchuy2102/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Linkedin
                    </a>{' '}
                    or check out my{' '}
                    <a
                        className='text-teal-500 hover:underline'
                        href='https://www.facebook.com/Duc.Huy2102'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Facebook
                    </a>
                </p>
                <Button
                    gradientDuoTone='purpleToPink'
                    className='w-[60%] rounded-tl-2xl rounded-bl-none rounded-br-2xl rounded-tr-none'
                >
                    <a
                        href='https://github.com/DucHuy2102'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        My Github
                    </a>
                </Button>
            </div>
            <div className='p-7 flex-1'>
                <img
                    src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220416200936/Top-10-Front-End-Developer-Skills-That-You-Need-in-2022.png'
                    alt=''
                    className='object-cover'
                />
            </div>
        </div>
    );
}
