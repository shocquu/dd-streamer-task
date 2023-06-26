import { ReactNode } from 'react';
import { Platform } from '../shared/enums';

type Record = {
    title: string;
    subtitle: string;
    imageUrl?: string;
    tag?: string;
    extra?: ReactNode;
};

const List = ({ data }: { data: Record[] }) => {
    const getColor = (platform: any) => {
        switch (platform) {
            case Platform.Twitch:
                return 'bg-twitch';
            case Platform.Youtube:
                return 'bg-youtube';
            case Platform.Tiktok:
                return 'bg-tiktok';
            case Platform.Kick:
                return 'bg-kick';
            case Platform.Rumble:
                return 'bg-rumble';
            default:
                return 'bg-slate-600';
        }
    };

    return (
        <ul role='list' className='divide-y divide-gray-100 dark:divide-gray-800'>
            {data.map(({ title, subtitle, imageUrl, tag, extra }) => (
                <li key={title} className='flex justify-between items-center gap-x-6 py-5'>
                    <div className='flex gap-x-4'>
                        <span className='inline-block h-12 w-12 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden'>
                            {imageUrl ? (
                                <img
                                    className='absolute w-12 h-12 flex-none rounded-full bg-gray-50'
                                    src={imageUrl}
                                    alt={`${title} avatar`}
                                />
                            ) : (
                                <svg
                                    className='h-full w-full text-gray-300 dark:text-gray-700 fill-white dark:fill-gray-500'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <rect x='0.62854' y='0.359985' width='15' height='15' rx='7.5' />
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
                        </span>
                        <div className='min-w-0 flex-auto'>
                            <p className='text-md font-semibold leading-6 text-slate-300'>{title}</p>
                            <section className='flex items-center gap-2 mt-1'>
                                <p className='truncate text-sm leading-5 text-slate-500'>{subtitle}</p>
                                {tag && (
                                    <>
                                        <svg viewBox='0 0 2 2' className='h-[3px] fill-slate-500'>
                                            <circle cx='1' cy='1' r='1'></circle>
                                        </svg>
                                        <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-400 border border-blue-400'>
                                            {tag}
                                        </span>
                                    </>
                                )}
                            </section>
                        </div>
                    </div>
                    <div className='mt-4'>{extra && extra}</div>
                </li>
            ))}
        </ul>
    );
};

export default List;
