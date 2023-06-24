import { Document } from 'mongoose';
import Platform from '../../enums/platform';

interface Streamer extends Document {
    name: string;
    description: string;
    platform: Platform;
    upvotesCount: number;
    downvotesCount: number;
    totalVotes?: number;
    imageUrl?: string;
}

export default Streamer;
