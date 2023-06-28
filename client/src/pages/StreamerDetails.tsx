import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from './MainLayout';
import { getStreamer } from '../services/api';
import { Streamer } from '../shared/types';
import { Platform } from '../shared/enums';

const StreamerDetails = () => {
    const [details, setDetails] = useState<Streamer>({});
    const { id } = useParams();

    const gradientClassName = `h-36 rounded-t-md opacity-75 bg-gradient-to-tr from-blue-400 bg-${details?.platform?.toLowerCase()}`;

    useEffect(() => {
        // async () => {
        //     const streamerDetails = await getStreamer(id ?? '');
        //     setDetails(streamerDetails);
        // };
        const fetchData = async () => {
            const streamerDetails = await getStreamer(id ?? '');
            setDetails(streamerDetails);
        };

        fetchData();
    }, []);

    return (
        <MainLayout>
            <Link to={'/'} className='flex items-center gap-2 text-slate-300'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>
                Back
            </Link>
            <section className='mt-4'>
                <div className={gradientClassName}></div>
                <div className='flex justify-center rounder-b-md bg-gray-800 bg-opacity-20'>
                    <article className='flex flex-col items-center'>
                        <div className='flex justify-between gap-8'>
                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-blue-700'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='w-6 h-6'>
                                    <path d='M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z' />
                                </svg>
                                {details?.upvotesCount}
                            </div>
                            <img
                                className='bg-slate-800 rounded-full object-cover z-10 w-36 h-36 -mt-10'
                                src={details?.imageUrl || '/no-avatar.jpg'}
                                alt={details?.name}
                            />
                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-red-700'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='w-6 h-6'>
                                    <path d='M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z' />
                                </svg>
                                {details?.downvotesCount}
                            </div>
                        </div>
                        <h1 className='text-2xl font-extrabold dark:text-slate-300 mt-2'>{details?.name}</h1>
                        <h2 className='text-md font-bold dark:text-slate-500 mt-1'>{details?.platform}</h2>
                        <p className='my-4 mb-8 text-md text-gray-500 text-center'>{details?.description}</p>
                    </article>
                </div>
            </section>
        </MainLayout>
    );
};

export default StreamerDetails;
