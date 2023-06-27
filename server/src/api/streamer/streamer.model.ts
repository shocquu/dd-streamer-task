import { model, Schema } from 'mongoose';
import Streamer from './streamer.interface';

const streamerSchema = new Schema<Streamer>({
    name: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    imageUrl: String,
    description: { type: String, default: '' },
    upvotesCount: { type: Number, default: 0 },
    downvotesCount: { type: Number, default: 0 },
    totalVotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Streamer = model<Streamer>('Streamer', streamerSchema);

export default Streamer;
