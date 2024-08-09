import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function Profile_Component() {
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log('currentUser', currentUser);

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-32 h-32 self-center cursor-pointer'>
                    <img
                        src={currentUser.avatar}
                        className='rounded-full h-full w-full object-cover border-8 border-[lightgray]'
                        alt='Avatar'
                    />
                </div>

                <TextInput
                    type='text'
                    id='username'
                    placeholder='Username'
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type='text'
                    id='email'
                    placeholder='Email'
                    defaultValue={currentUser.email}
                />
                <TextInput type='text' id='password' placeholder='Password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>

            <div className='text-red-500 flex justify-between mt-4'>
                <span className='border px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-none transition duration-200 cursor-pointer'>
                    Delete Account
                </span>
                <span className='border px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-none transition duration-200 cursor-pointer'>
                    Sign Out
                </span>
            </div>
        </div>
    );
}
