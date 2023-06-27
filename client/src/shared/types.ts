export type Streamer = {
    _id: string;
    name: string;
    platform: string;
    imageUrl?: string;
    description?: string;
    upvotesCount: number;
    downvotesCount: number;
};

export type AddStreamerData = {
    name: string;
    platform: string;
    imageUrl?: string;
    description?: string;
};

export type VoteType = 'upvote' | 'downvote';
