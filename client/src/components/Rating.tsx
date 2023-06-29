import { useEffect, useState } from 'react';
import { upvoteStreamer, downvoteStreamer, removeUpvote, removeDownvote } from '../services/api';
import { formatNumber } from '../utils';
import { VoteType } from '../shared/enums';
import { getLocalStorageItem, saveLocalStorageVote, removeLocalStorageVote } from '../utils/localStorage';
import { ThumbUp, ThumbDown } from './icons';

type RatingProps = {
    id: string;
    likes: number;
    dislikes: number;
};

const Rating = ({ id, likes = 0, dislikes = 0 }: RatingProps) => {
    const [submittedVotes, setSubmittedVotes] = useState<Record<string, VoteType>>({});
    const [localDislikes, setLocalDislikes] = useState(dislikes);
    const [localLikes, setLocalLikes] = useState(likes);
    const [widthPercentage, setWidthPercentage] = useState(0);

    const handleUpvote = async () => {
        if (submittedVotes[id]) await handleRemoveDownvote();

        await upvoteStreamer(id);
        saveLocalStorageVote(id, VoteType.Upvote);
        setLocalLikes((prevState) => prevState + 1);
    };

    const handleDownvote = async () => {
        if (submittedVotes[id]) await handleRemoveUpvote();

        await downvoteStreamer(id);
        saveLocalStorageVote(id, VoteType.Downvote);
        setLocalDislikes((prevState) => prevState + 1);
    };

    const handleRemoveUpvote = async () => {
        await removeUpvote(id);
        removeLocalStorageVote(id);
        setLocalLikes((prevState) => prevState - 1);
    };

    const handleRemoveDownvote = async () => {
        await removeDownvote(id);
        removeLocalStorageVote(id);
        setLocalDislikes((prevState) => prevState - 1);
    };

    const UpvoteButton =
        submittedVotes[id] === VoteType.Upvote ? (
            <button className='flex items-center text-blue-600 dark:text-blue-300' onClick={handleRemoveUpvote}>
                <ThumbUp.Solid size={5} />
                <p className='ml-2 text-xs font-bold'>{formatNumber(localLikes)}</p>
            </button>
        ) : (
            <button
                className='flex items-center text-slate-700 dark:text-slate-300 hover:text-white'
                onClick={handleUpvote}>
                <ThumbUp size={5} />
                <p className='ml-2 text-xs font-bold'>{formatNumber(localLikes)}</p>
            </button>
        );

    const DownvoteButton =
        submittedVotes[id] === VoteType.Downvote ? (
            <button className='flex items-center text-red-600 dark:text-red-300' onClick={handleRemoveDownvote}>
                <ThumbDown.Solid size={5} />
                <p className='ml-2 text-xs font-bold'>{formatNumber(localDislikes)}</p>
            </button>
        ) : (
            <button
                className='flex items-center text-slate-700 dark:text-slate-300 hover:text-white'
                onClick={handleDownvote}>
                <ThumbDown size={5} />
                <p className='ml-2 text-xs font-bold'>{formatNumber(localDislikes)}</p>
            </button>
        );

    useEffect(() => {
        const totalVotes = localLikes + localDislikes;
        const likeRatio = localLikes / totalVotes;
        setWidthPercentage(likeRatio * 100);
        setSubmittedVotes(getLocalStorageItem('votes') || {});
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
