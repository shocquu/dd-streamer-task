import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStreamer } from '../services/api';
import { Streamer } from '../shared/types';
import { ThumbDown, ThumbUp } from '../components/icons';

const StreamerDetails = () => {
    const [details, setDetails] = useState<Streamer>({
        _id: '',
        name: '',
        platform: '',
        description: '',
        upvotesCount: 0,
        downvotesCount: 0,
    });
    const { id } = useParams();

    const gradientClassName = `h-36 rounded-t-md opacity-75 bg-gradient-to-tr from-blue-400 bg-${details?.platform?.toLowerCase()}`;

    useEffect(() => {
        const fetchData = async () => {
            const streamerDetails = await getStreamer(id ?? '');
            setDetails(streamerDetails);
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Link to={'/'} className='flex items-center gap-2 text-slate-800 dark:text-slate-300'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>
                Back
            </Link>
            <section className='mt-4'>
                <div className={gradientClassName}></div>
                <div className='flex justify-center rounded-b-md bg-gray-400 dark:bg-gray-800 bg-opacity-20'>
                    <article className='flex flex-col items-center'>
                        <div className='flex justify-between gap-8'>
                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-blue-600 dark:text-blue-300'>
                                <ThumbUp.Solid />
                                {details?.upvotesCount}
                            </div>
                            {details?.imageUrl ? (
                                <img
                                    className='bg-slate-400 dark:bg-slate-800 rounded-full border-4 border-blue-400 object-cover z-10 w-36 h-36 -mt-10'
                                    src={details.imageUrl}
                                    alt={details.name}
                                />
                            ) : (
                                <svg
                                    className='h-36 w-36 text-gray-300 dark:text-gray-700 fill-white dark:fill-gray-500 border-4 rounded-full border-slate-300 dark:border-slate-800 -mt-10 z-10'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <rect x='0' y='0' width='16' height='16' rx='7.5' />
                                    <path
                                        d='M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z'
                                        fill='currentColor'
                                    />
                                    <path
                                        d='M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z'
                                        fill='currentColor'
                                    />
                                </svg>
                            )}

                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-red-600 dark:text-red-300'>
                                <ThumbDown.Solid />
                                {details?.downvotesCount}
                            </div>
                        </div>
                        <h1 className='text-2xl font-extrabold text-slate-800 dark:text-slate-300 mt-2'>
                            {details?.name}
                        </h1>
                        <h2 className='text-md font-bold text-slate-600 dark:text-slate-500 mt-1'>
                            {details?.platform}
                        </h2>
                        <p className='my-4 mb-8 text-md text-gray-600 dark:text-gray-500 text-center'>
                            {details?.description}
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
};

export default StreamerDetails;
