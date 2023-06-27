import { useEffect, useState } from 'react';
import { Form, List, Rating } from '../components';
import { addStreamer, getStreamers } from '../services/api';
import { ListRecord } from '../components/List';
import { Platform } from '../shared/enums';
import { FieldConfig } from '../components/Form';

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

    const handleSubmit = async (values: StreamerFormValues) => {
        const addedStreamer = await addStreamer(values);
        const newListEntry = {
            id: addedStreamer._id,
            title: addedStreamer.name,
            subtitle: addedStreamer.description ?? '',
            imageUrl: addedStreamer.imageUrl ?? '',
            tag: addedStreamer.platform,
            extra: (
                <Rating
                    id={addedStreamer._id}
                    likes={addedStreamer.upvotesCount}
                    dislikes={addedStreamer.downvotesCount}
                />
            ),
        };
        setStreamerList((prevList) => [newListEntry, ...prevList]);
    };

    useEffect(() => {
        const fetchStreamers = async () => {
            try {
                const streamers = await getStreamers();
                const transformedStreamers = streamers
                    .slice(0)
                    .reverse()
                    .map(({ _id, name, description, imageUrl, platform, upvotesCount, downvotesCount }) => ({
                        id: _id,
                        title: name,
                        subtitle: description ?? '',
                        tag: platform,
                        imageUrl,
                        extra: <Rating id={_id} likes={upvotesCount} dislikes={downvotesCount} />,
                    }));

                setStreamerList(transformedStreamers);
            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
        };

        fetchStreamers();
    }, []);

    return (
        <div className={'min-h-screen bg-gray-100 dark:bg-gray-900'}>
            <header className={`bg-white dark:bg-gray-800 shadow`}>
                <div className='max-w-4xl mx-auto py-4 px-8'>
                    <h1 className={`text-2xl font-bold text-gray-800 dark:text-slate-200`}>
                        Streamer Spotlight Application
                    </h1>
                </div>
            </header>
            <main className='max-w-4xl mx-auto py-6 sm:px-6 lg:px-8'>
                <Form<StreamerFormValues>
                    initialValues={initialValues}
                    fieldConfig={formFieldConfig}
                    onSubmit={handleSubmit}
                />
                <div className='px-4 py-6 sm:px-0'>
                    <List data={streamerList} />
                </div>
            </main>
            <footer className={'fixed inset-x-0 bottom-0 bg-gray-200 dark:bg-gray-950 py-2'}>
                <div className='max-w-4xl mx-auto px-6 text-center'>
                    <p className={'text-gray-800 dark:text-slate-500 text-sm'}>Dare Drop</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
