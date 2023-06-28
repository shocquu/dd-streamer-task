import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './pages/layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const StreamerDetails = lazy(() => import('./pages/StreamerDetails'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/streamers/:id' element={<StreamerDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
