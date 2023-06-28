import { useEffect, useState } from 'react';
import { addStreamer, getStreamers } from '../services/api';
import { Form, List, Rating } from '../components';
import { FieldConfig } from '../components/Form';
import { ListRecord } from '../components/List';
import { Platform } from '../shared/enums';
import MainLayout from './MainLayout';

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
        <MainLayout>
            <Form<StreamerFormValues>
                initialValues={initialValues}
                fieldConfig={formFieldConfig}
                onSubmit={handleSubmit}
            />
            <div className='px-4 py-6 sm:px-0'>
                <List data={streamerList} />
            </div>
        </MainLayout>
    );
};

export default HomePage;
