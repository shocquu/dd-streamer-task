import { Suspense, lazy, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addStreamer, getStreamers } from '../services/api';
import { Form, Rating, Skeleton } from '../components';
import { FieldConfig } from '../components/Form';
import { ListRecord } from '../components/List';
import { Platform } from '../shared/enums';
import usePagination from '../hooks/usePagination';
import { Streamer } from '../shared/types';

const List = lazy(() => import('../components/List'));

type StreamerFormValues = {
    name: string;
    platform: Platform;
    imageUrl?: string;
    description?: string;
};

const initialValues: StreamerFormValues = {
    name: '',
    platform: Platform.Twitch,
    imageUrl: '',
    description: '',
};

const formFieldConfig: FieldConfig<StreamerFormValues> = {
    name: {
        required: true,
        type: 'input',
        label: 'Streamer name',
        placeholder: 'John Doe',
        inline: true,
    },
    platform: {
        type: 'select',
        inline: true,
        options: Object.values(Platform),
    },
    imageUrl: {
        type: 'input',
        label: 'Image URL',
        placeholder: 'https://example.com/image.png',
    },
    description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'Leave a comment...',
    },
};

const HomePage = () => {
    const [streamerList, setStreamerList] = useState<ListRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const { data, total, loadMore } = usePagination<Streamer>({
        fetchData: getStreamers,
        initialOffset: 0,
        initialLimit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const handleSubmit = async (values: StreamerFormValues) => {
        try {
            setIsLoading(true);
            const addedStreamer = await addStreamer(values);
            const newListEntry = {
                id: addedStreamer._id,
                title: addedStreamer.name,
                subtitle: addedStreamer.description ?? '',
                imageUrl: addedStreamer.imageUrl,
                tag: addedStreamer.platform,
                extra: <Rating id={addedStreamer._id} likes={0} dislikes={0} />,
            };
            console.log(addedStreamer);
            setStreamerList((prevList) => [newListEntry, ...prevList]);
        } catch (error) {
            console.error('An error occured: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!data) return;

        const transformed = data.map(
            ({ _id, name, description, imageUrl, platform, upvoted, downvoted, statistics }) => ({
                id: _id,
                title: name,
                subtitle: description ?? '',
                tag: platform,
                imageUrl,
                extra: (
                    <Rating
                        id={_id}
                        likes={statistics.upvotesCount}
                        dislikes={statistics.downvotesCount}
                        hasUpvoted={upvoted.includes(userId)}
                        hasDownvoted={downvoted.includes(userId)}
                    />
                ),
            })
        );
        setStreamerList(transformed);
    }, [data, userId]);

    useEffect(() => {
        let uuid = localStorage.getItem('userId') ?? '';

        if (!uuid) {
            uuid = uuidv4();
            localStorage.setItem('userId', uuid);
        }

        setUserId(uuid);
    }, []);

    return (
        <>
            <Form<StreamerFormValues>
                initialValues={initialValues}
                fieldConfig={formFieldConfig}
                isLoading={isLoading}
                onSubmit={handleSubmit}
            />
            <div className='px-4 py-6 sm:px-0'>
                <Suspense fallback={<Skeleton.List />}>
                    <List data={streamerList} />
                    {streamerList.length < total && (
                        <button
                            type='button'
                            className='block mx-auto text-xs text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mb-2 dark:border-slate-400 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 dark:focus:ring-slate-700'
                            onClick={loadMore}>
                            Load
                        </button>
                    )}
                </Suspense>
            </div>
        </>
    );
};

export default HomePage;
