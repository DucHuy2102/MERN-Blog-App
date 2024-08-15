import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { user_DeleteAccount, user_SignOut, user_UpdateProfile } from '../redux/slices/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Profile_Component() {
    // get current user from redux store
    const currentUser = useSelector((state) => state.user.currentUser);

    // states
    const dispatch = useDispatch();
    const [imgFile, setImgFile] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(null);
    const [formData, setFormData] = useState({});
    const fileRef = useRef();
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(null);
    const [uploadFailed, setUploadError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // handle change avatar function
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgFile(file);
            setImgURL(URL.createObjectURL(file));
        }
    };

    // upload image to firebase storage
    useEffect(() => {
        if (imgFile) {
            const uploadImage = async () => {
                setUploadError(null);
                const storage = getStorage(app);
                const fileName = new Date().getTime() + imgFile.name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, imgFile);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImgUploadProgress(progress.toFixed(0));
                        console.log('Upload is ' + progress + '% done');
                    },
                    () => {
                        setUploadError('Could not upload image (File must be less than 2MB)');
                        setTimeout(() => setUploadError(null), 5000);
                        setImgUploadProgress(null);
                        setImgFile(null);
                        setImgURL(null);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImgURL(downloadURL);
                            setFormData({ ...formData, avatar: downloadURL });
                        });
                    }
                );
            };

            uploadImage();
        }
    }, [imgFile]);

    // handle change input function
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // update user profile function
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setIsUpdateSuccess(null);
        setUploadError(null);
        if (Object.keys(formData).length === 0) {
            setUploadError('Nothing changed to update !!!');
            setTimeout(() => {
                setUploadError(null);
            }, 5000);
            return;
        }
        if (imgUploadProgress && imgUploadProgress < 100) {
            setUploadError('Please wait for image to upload !!!');
            setTimeout(() => {
                setUploadError(null);
            }, 5000);
            return;
        }
        try {
            const res = await axios.put(`/api/user/update/${currentUser._id}`, formData);
            if (res?.status === 200) {
                const updatedUser = res.data;
                setIsUpdateSuccess('Update user successfully');
                setTimeout(() => {
                    setIsUpdateSuccess(null);
                }, 5000);
                dispatch(user_UpdateProfile(updatedUser));
            }
        } catch (error) {
            const errorMessages = error.response?.data?.message;
            if (errorMessages) {
                setUploadError(errorMessages || 'An unexpected error occurred');
                setTimeout(() => {
                    setUploadError(null);
                }, 5000);
            }
            console.log(error);
        }
    };

    // delete account function
    const handleDeleteAccount = async () => {
        setShowModal(false);
        try {
            const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
            if (res?.status === 200) {
                dispatch(user_DeleteAccount());
                localStorage.removeItem('user');
            }
        } catch (error) {
            const errorMessages = error.response?.data?.message;
            if (errorMessages) {
                setUploadError(errorMessages || 'An unexpected error occurred');
                setTimeout(() => {
                    setUploadError(null);
                }, 5000);
            }
            console.log(error);
        }
    };

    // sign out function
    const handleSignOutAccount = async () => {
        try {
            const res = await axios.post('/api/auth/sign-out');
            if (res?.status === 200) {
                dispatch(user_SignOut());
            }
        } catch (error) {
            setUploadError('An unexpected error occurred');
            setTimeout(() => {
                setUploadError(null);
            }, 5000);
            console.log(error);
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>

            {/* form */}
            <form className='flex flex-col gap-4' onSubmit={handleSubmitForm}>
                {/* avatar */}
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleChangeAvatar}
                    ref={fileRef}
                    hidden
                />
                <div
                    className='relative w-32 h-32 self-center cursor-pointer'
                    onClick={() => fileRef.current.click()}
                >
                    {imgUploadProgress && imgUploadProgress < 100 && (
                        <CircularProgressbar
                            value={imgUploadProgress || 0}
                            text={`${imgUploadProgress === null ? '' : imgUploadProgress + '%'}`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(0,255,0,${imgUploadProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img
                        src={imgURL || currentUser.avatar}
                        className={`rounded-full h-full w-full object-cover border-8 border-[lightgray] ${
                            imgUploadProgress && imgUploadProgress < 100 && 'opacity-60'
                        }`}
                        alt='Avatar'
                    />
                </div>

                {/* show error when upload failed */}
                {uploadFailed && (
                    <Alert
                        color='failure'
                        className='w-full font-semibold flex justify-center items-center'
                    >
                        {uploadFailed}
                    </Alert>
                )}

                {/* show message when update successfully */}
                {isUpdateSuccess && (
                    <Alert
                        color='success'
                        className='w-full font-semibold flex justify-center items-center'
                    >
                        {isUpdateSuccess}
                    </Alert>
                )}

                {/* input fields */}
                <TextInput
                    type='text'
                    id='username'
                    placeholder='Username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='text'
                    id='email'
                    placeholder='Email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='text'
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                />

                {/* button update profile */}
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    disabled={imgUploadProgress && imgUploadProgress < 100}
                >
                    {imgUploadProgress && imgUploadProgress < 100
                        ? 'Please wait for image to upload'
                        : 'Update Profile'}
                </Button>

                {/* button create a post: only for admin */}
                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button type='button' className='w-full' gradientDuoTone='purpleToPink'>
                            Create a Post
                        </Button>
                    </Link>
                )}
            </form>

            {/* buttons: delete account & sign out */}
            <div className='text-red-500 flex justify-between mt-4'>
                <span
                    onClick={() => setShowModal(true)}
                    className='border px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-none transition duration-200 cursor-pointer'
                >
                    Delete Account
                </span>
                <span
                    onClick={handleSignOutAccount}
                    className='border px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-none transition duration-200 cursor-pointer'
                >
                    Sign Out
                </span>
            </div>

            {/* delete account modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} size='md' popup>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='text-red-500 text-5xl mx-auto' />
                        <span className='text-lg font-medium text-black'>
                            This action cannot be undone. Do you want to proceed with deleting?
                        </span>
                        <div className='flex justify-between items-center mt-5'>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button color='failure' onClick={handleDeleteAccount}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
