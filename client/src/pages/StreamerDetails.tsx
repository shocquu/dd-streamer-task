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
            <Link to={'/'} className='flex items-center gap-2 text-slate-300'>
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
                <div className='flex justify-center rounder-b-md bg-gray-800 bg-opacity-20'>
                    <article className='flex flex-col items-center'>
                        <div className='flex justify-between gap-8'>
                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-blue-300'>
                                <ThumbUp.Solid />
                                {details?.upvotesCount}
                            </div>
                            <img
                                className='bg-slate-800 rounded-full border-4 border-blue-400 object-cover z-10 w-36 h-36 -mt-10'
                                src={details?.imageUrl || '/no-avatar.jpg'}
                                alt={details?.name}
                            />
                            <div className='w-15 mt-4 flex flex-col items-center font-bold text-red-300'>
                                <ThumbDown.Solid />
                                {details?.downvotesCount}
                            </div>
                        </div>
                        <h1 className='text-2xl font-extrabold dark:text-slate-300 mt-2'>{details?.name}</h1>
                        <h2 className='text-md font-bold dark:text-slate-500 mt-1'>{details?.platform}</h2>
                        <p className='my-4 mb-8 text-md text-gray-500 text-center'>{details?.description}</p>
                    </article>
                </div>
            </section>
        </>
    );
};

export default StreamerDetails;
