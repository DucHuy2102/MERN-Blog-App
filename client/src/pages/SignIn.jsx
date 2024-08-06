import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
    // state for error message and loading
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const navigate = useNavigate();

    // handle value of form input fields
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return setErrorMessage('Please fill all fields');
        }
        try {
            setErrorMessage(null);
            setLoadingState(true);
            const res = await axios.post('/api/auth/sign-in', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = res.data;
            console.log(res);
            // navigate to home page if user signed in successfully
            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
        } finally {
            setLoadingState(false);
        }
    };

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
                        Sign in to get access to all features of dHuy&apos;s Blog
                    </p>
                </div>

                {/* right */}
                <div className='flex-1'>
                    {/* form sign up */}
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='text'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            disabled={loadingState}
                            type='submit'
                            className='bg-gradient-to-r from-[#44cdc4] via-[#86A8E7] to-[#D16BA5]'
                        >
                            {loadingState ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    {/* sign up */}
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don&apos;t have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign Up
                        </Link>
                    </div>

                    {/* error message */}
                    {errorMessage && (
                        <Alert
                            className='mt-5 flex justify-center items-center font-bold'
                            color='failure'
                        >
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
