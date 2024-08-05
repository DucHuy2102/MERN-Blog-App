import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    return (
        <div className='min-h-screen mt-20'>
            <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5'>
                {/* left */}
                <div className='flex-1'>
                    <Link to='/' className='text-4xl font-bold dark:text-white'>
                        <span className='bg-gradient-to-r from-[#D16BA5] via-[#86A8E7] to-[#44cdc4] px-2 py-1 rounded-lg text-white'>
                            dHuy&apos;s
                        </span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        Sign up to get access to all features of dHuy&apos;s Blog
                    </p>
                </div>

                {/* right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4'>
                        <div>
                            <Label value='Your username' />
                            <TextInput type='text' placeholder='Username' id='username' />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput type='text' placeholder='name@company.com' id='email' />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput type='password' placeholder='Password' id='password' />
                        </div>
                        <Button
                            type='submit'
                            className='bg-gradient-to-r from-[#44cdc4] via-[#86A8E7] to-[#D16BA5]'
                        >
                            Sign Up
                        </Button>
                    </form>

                    {/* sign in */}
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
