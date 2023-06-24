import { model, Schema } from 'mongoose';
import Streamer from './streamer';

const streamerSchema = new Schema<Streamer>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    upvotesCount: {
        type: Number,
        required: true,
    },
    downvotesCount: {
        type: Number,
        required: true,
    },
    totalVotes: Number,
    imageUrl: String,
});

const Streamer = model<Streamer>('Streamer', streamerSchema);

export default Streamer;
