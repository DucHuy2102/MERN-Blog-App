import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { user_SignIn } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function OAuth_Component() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const result = await signInWithPopup(auth, provider);
            const res = await axios.post(
                '/api/auth/google-sign-in',
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = res.data;
            if (res.status === 200) {
                dispatch(user_SignIn(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type='button' onClick={handleGoogleClick} gradientDuoTone='pinkToOrange' outline>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Sign in with Google
        </Button>
    );
}
