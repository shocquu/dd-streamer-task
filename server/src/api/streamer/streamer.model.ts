import { model, Schema } from 'mongoose';
import Streamer from './streamer.interface';
import { VoteType } from '../../enums';

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
    votes: [
        {
            userId: {
                type: String,
                required: true,
            },
            voteType: {
                type: String,
                enum: VoteType,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const Streamer = model<Streamer>('Streamer', streamerSchema);

export default Streamer;
