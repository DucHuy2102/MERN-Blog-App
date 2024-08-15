import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    const [value, setValue] = useState('');

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
                    <FileInput type='file' accept='image/*' />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                        Upload image
                    </Button>
                </div>
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
