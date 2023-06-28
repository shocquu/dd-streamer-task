import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const MainLayout = () => {
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
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </main>
            <footer className={'fixed inset-x-0 bottom-0 bg-gray-200 dark:bg-gray-950 py-2'}>
                <div className='max-w-4xl mx-auto px-6 text-center'>
                    <p className={'text-gray-800 dark:text-slate-500 text-sm'}>Dare Drop</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
