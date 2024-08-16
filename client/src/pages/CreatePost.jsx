import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image to upload');
                return;
            }
            setImageUploadError(null);
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
                    setImageUploadError('Failed to upload image! Please try again later.');
                    console.error('Error when upload image -->', e);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadProgress(null);
            setImageUploadError('Failed to upload image! Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className='p-3 mx-auto min-h-screen'>
            <h1 className='my-7 text-center text-3xl font-semibold'>Create New Post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                    />
                    <Select>
                        <option value='uncategorized'>Select Category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='python'>Python</option>
                        <option value='react'>React</option>
                        <option value='vue'>Vue</option>
                    </Select>
                </div>
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

                {/* show error when upload failed */}
                {imageUploadError && (
                    <Alert
                        color='failure'
                        className='w-full font-semibold flex justify-center items-center'
                    >
                        {imageUploadError}
                    </Alert>
                )}

                {/* show image preview */}
                {formData?.image && (
                    <img src={formData.image} alt='preview' className='w-full h-72 object-cover' />
                )}

                <ReactQuill
                    theme='snow'
                    className='h-72 mb-12'
                    value={value}
                    onChange={setValue}
                    required
                />
                <Button type='submit' gradientDuoTone='purpleToBlue'>
                    Publish
                </Button>
            </form>
        </div>
    );
}
