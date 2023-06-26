export type Streamer = {
    id: string;
    name: string;
    platform: string;
    description: string;
    upvotesCount: number;
    downvotesCount: number;
};

export type AddStreamerData = {
    name: string;
    platform: string;
    description: string;
};

export type VoteType = 'upvote' | 'downvote';
