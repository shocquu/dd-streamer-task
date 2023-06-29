import { useEffect, useState } from 'react';
import { upvoteStreamer, downvoteStreamer } from '../services/api';
import { formatNumber } from '../utils';
import { ThumbUp, ThumbDown } from './icons';

type RatingProps = {
    id: string;
    likes: number;
    dislikes: number;
    hasUpvoted?: boolean;
    hasDownvoted?: boolean;
};

const Rating = ({ id, likes, dislikes, hasUpvoted, hasDownvoted }: RatingProps) => {
    const [localDislikes, setLocalDislikes] = useState(dislikes);
    const [localLikes, setLocalLikes] = useState(likes);
    const [widthPercentage, setWidthPercentage] = useState(0);
    const [downvoted, setDownvoted] = useState(hasDownvoted);
    const [upvoted, setUpvoted] = useState(hasUpvoted);

    const handleUpvote = async () => {
        try {
            await upvoteStreamer(id);
            setUpvoted((prevState) => !prevState);
            setDownvoted(false);

            if (downvoted) setLocalDislikes((prevState) => prevState - 1);
            if (upvoted) setLocalLikes((prevState) => prevState - 1);
            else setLocalLikes((prevState) => prevState + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownvote = async () => {
        try {
            await downvoteStreamer(id);
            setDownvoted((prevState) => !prevState);
            setUpvoted(false);

            if (upvoted) setLocalLikes((prevState) => prevState - 1);
            if (downvoted) setLocalDislikes((prevState) => prevState - 1);
            else setLocalDislikes((prevState) => prevState + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const UpvoteButton = upvoted ? (
        <button className='flex items-center text-blue-600 dark:text-blue-300' onClick={handleUpvote}>
            <ThumbUp.Solid />
            <p className='ml-2 text-xs font-bold'>{formatNumber(localLikes)}</p>
        </button>
    ) : (
        <button
            className='flex items-center text-slate-700 dark:text-slate-300 hover:text-white'
            onClick={handleUpvote}>
            <ThumbUp />
            <p className='ml-2 text-xs font-bold'>{formatNumber(localLikes)}</p>
        </button>
    );

    const DownvoteButton = downvoted ? (
        <button className='flex items-center text-red-600 dark:text-red-300' onClick={handleDownvote}>
            <ThumbDown.Solid />
            <p className='ml-2 text-xs font-bold'>{formatNumber(localDislikes)}</p>
        </button>
    ) : (
        <button
            className='flex items-center text-slate-700 dark:text-slate-300 hover:text-white'
            onClick={handleDownvote}>
            <ThumbDown />
            <p className='ml-2 text-xs font-bold'>{formatNumber(localDislikes)}</p>
        </button>
    );

    useEffect(() => {
        const totalVotes = localLikes + localDislikes;
        const likeRatio = localLikes / totalVotes;
        setWidthPercentage(likeRatio * 100);

        // setSubmittedVotes(getLocalStorageItem('votes') || {});
    }, [localLikes, localDislikes]);

    return (
        <>
            <div className='flex items-center text-slate-300'>
                {UpvoteButton}
                <span className='w-1 h-1 mx-1.5 rounded-full bg-gray-700 dark:bg-gray-600'></span>
                {DownvoteButton}
            </div>
            <div className='mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-0.5'>
                <div
                    className={'h-0.5 rounded-full bg-gray-800  dark:bg-gray-300'}
                    style={{ width: `${widthPercentage}%` }}></div>
            </div>
        </>
    );
};

export default Rating;
