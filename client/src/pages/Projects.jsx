import { CallToAction_Component } from '../components/exportComponent';

export default function Projects() {
    return (
        <div className='font-serif min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
            <h1 className='text-4xl font-semibold'>More Projects</h1>
            <p className='text-lg text-center text-gray-500'>
                If you&apos;re interested in collaborating, have any questions, or just want to
                connect, feel free to reach out. I&apos;m always excited to engage with like-minded
                individuals and explore new opportunities together!
            </p>
            <CallToAction_Component />
        </div>
    );
}
