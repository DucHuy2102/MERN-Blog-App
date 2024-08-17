import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePost() {
    const currentUser = useSelector((state) => state.user.currentUser);

    // state
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { postID } = useParams();

    // get post by id
    useEffect(() => {
        const getPostById = async () => {
            try {
                const res = await axios.get(`/api/post/get-posts?postID=${postID}`);
                if (res.status === 200) {
                    const postData = res.data.posts[0];
                    setFormData(postData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getPostById();
    }, [postID]);

    // handle upload image
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setError('Please select an image to upload');
                return;
            }
            setError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setImageUploadProgress(progress.toFixed(0));
                },
                (e) => {
                    setImageUploadProgress(null);
                    setError('Failed to upload image! Please try again later.');
                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                    console.error('Error when upload image -->', e);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadProgress(null);
            setError('Failed to upload image! Please try again later.');
            setTimeout(() => {
                setError(null);
            }, 5000);
            console.error(error);
        }
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `/api/post/update-post/${postID}/${currentUser._id}`,
                formData
            );
            console.log(res);
            if (res.status === 200) {
                setError(null);
                setFormData({});
                navigate(`/posts/${res.data.slug}`);
            }
        } catch (error) {
            setFormData({});
            setError('Something went wrong! Please try again later.');
            setTimeout(() => {
                setError(null);
            }, 5000);
            console.log(error);
        }
    };

    return (
        <div className='p-3 mx-auto min-h-screen'>
            <h1 className='my-7 text-center text-3xl font-semibold'>Update Post</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {/* title and category */}
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        value={formData.title}
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value='uncategorized'>Select Category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='python'>Python</option>
                        <option value='react'>React</option>
                        <option value='vue'>Vue</option>
                    </Select>
                </div>

                {/* image upload */}
                <div className='p-3 flex gap-4 items-center justify-between border-4 border-dotted border-teal-500'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        disabled={imageUploadProgress}
                        onClick={handleUploadImage}
                    >
                        {imageUploadProgress ? (
                            <CircularProgressbar
                                value={imageUploadProgress}
                                text={`${imageUploadProgress}%`}
                            />
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>

                {/* show image preview */}
                {formData?.image && (
                    <img src={formData.image} alt='preview' className='w-full h-72 object-cover' />
                )}

                {/* content */}
                <ReactQuill
                    value={formData.content}
                    theme='snow'
                    className='h-72 mb-12'
                    placeholder='Write something amazing...'
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    required
                />

                {/* show error when upload failed */}
                {error && (
                    <Alert
                        color='failure'
                        className='w-full font-semibold flex justify-center items-center'
                    >
                        {error}
                    </Alert>
                )}

                {/* publish button */}
                <Button type='submit' gradientDuoTone='purpleToBlue'>
                    Update
                </Button>
            </form>
        </div>
    );
}
