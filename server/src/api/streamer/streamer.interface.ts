import { Platform, VoteType } from '../../enums';

interface Vote {
    userId: string;
    voteType: VoteType;
    timestamp?: Date;
}

interface Streamer {
    name: string;
    description: string;
    platform: Platform;
    votes: Vote[];
    imageUrl?: string;
    createdAt: Date;
}

export default Streamer;
