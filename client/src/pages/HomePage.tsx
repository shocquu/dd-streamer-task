import { useEffect, useState } from 'react';
import { List, Rating } from '../components';
import { Streamer } from '../shared/types';
import { getStreamers } from '../services/api';

const data = [
    {
        title: 'Leslie Alexander',
        subtitle: 'leslie.alexander@example.com',
        tag: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        extra: <Rating likes={100} dislikes={50} />,
    },
    {
        title: 'Michael Foster',
        subtitle: 'michael.foster@example.com',
        tag: 'Co-Founder / CTO',
        // imageUrl:
        //     'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        extra: <Rating likes={140000} dislikes={420} />,
    },
    {
        title: 'Dries Vincent',
        subtitle: 'dries.vincent@example.com',
        tag: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        title: 'Lindsay Walton',
        subtitle: 'lindsay.walton@example.com',
        tag: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        extra: '3h ago',
    },
    {
        title: 'Courtney Henry',
        subtitle: 'courtney.henry@example.com',
        tag: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        extra: '3h ago',
    },
    {
        title: 'Tom Cook',
        subtitle: 'tom.cook@example.com',
        tag: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

const HomePage = () => {
    const [streamerList, setStreamerList] = useState<any[]>([]);

    useEffect(() => {
        const fetchStreamers = async () => {
            try {
                const streamers = await getStreamers();
                const transformedStreamers = streamers.map(
                    ({ name, description, platform, upvotesCount, downvotesCount }) => ({
                        title: name,
                        subtitle: description,
                        tag: platform,
                        extra: <Rating likes={upvotesCount} dislikes={downvotesCount} />,
                    })
                );

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
                <div className='max-w-7xl mx-auto py-4 px-6'>
                    <h1 className={`text-2xl font-bold text-gray-800 dark:text-slate-200`}>Streamers Database</h1>
                </div>
            </header>
            <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <List data={streamerList} />
                </div>
            </main>
            <footer className={'fixed inset-x-0 bottom-0 bg-gray-200 dark:bg-gray-950 py-2'}>
                <div className='max-w-7xl mx-auto px-6 text-center'>
                    <p className={'text-gray-800 dark:text-slate-500 text-sm'}>Dare Drop</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
