import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, StreamerDetails } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/streamers/:id' element={<StreamerDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
