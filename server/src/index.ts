import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import streamerRoutes from './api/streamer/streamer.routes';
import connectToDatabase from './config/db';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/streamers', streamerRoutes);

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database: ', error);
    });
