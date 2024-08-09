import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Profile_Component() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [imgFile, setImgFile] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(null);
    const [imgUploadError, setImgUploadError] = useState(null);
    console.log(imgUploadError, imgUploadProgress);
    const fileRef = useRef();

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgFile(file);
            setImgURL(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imgFile) {
            const uploadImage = async () => {
                setImgUploadError(null);
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
                    (error) => {
                        setImgUploadError('Could not upload image (File must be less than 2MB)');
                        setImgUploadProgress(null);
                        setImgFile(null);
                        setImgURL(null);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImgURL(downloadURL);
                        });
                    }
                );
            };

            uploadImage();
        }
    }, [imgFile]);

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
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
                {imgUploadError && (
                    <Alert
                        color='failure'
                        className='w-full font-semibold flex justify-center items-center'
                    >
                        {imgUploadError}
                    </Alert>
                )}

                {/* input fields */}
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
